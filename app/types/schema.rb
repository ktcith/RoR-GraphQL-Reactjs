require 'relay_helpers'

Schema = GraphQL::Schema.define do
  query QueryType
  mutation MutationType

  resolve_type -> (obj, ctx) do
    (obj.class.name + "Type").constantize
  end

  object_from_id ->(id, ctx) do
    return nil if id.blank?
    return Root.new if id == "root"
    type_name, item_id = GraphQL::Schema::UniqueWithinType.decode(id)
    item = type_name.constantize.find(item_id)
    if item == nil
      raise "#{type_name.constantize} could not find record ##{item_id.inspect} when getting object from id: #{id.inspect}"
    end
    if ctx[:current_ability].try(:can?, :read, item)
      item
    else
      return nil
      #raise "Authorization error.  Not allowed to read #{type_name.constantize} ##{item_id.inspect} when getting object from id: #{id.inspect}"
    end
  end

  id_from_object -> (object, type_definition, ctx) do
    GraphQL::Schema::UniqueWithinType.encode(type_definition.name, object.id)
  end
end

module RelaySchemaHelpers
  # Schema.json location
  SCHEMA_DIR  = Rails.root.join('app','assets','client')
  SCHEMA_PATH = File.join(SCHEMA_DIR, 'relay_schema.json')

  def execute_introspection_query
    # Cache the query result
    Rails.cache.fetch checksum do
      execute GraphQL::Introspection::INTROSPECTION_QUERY
    end
  end

  def checksum
    files   = Dir["app/graph/**/*.rb"].reject { |f| File.directory?(f) }
    content = files.map { |f| File.read(f) }.join
    Digest::SHA256.hexdigest(content).to_s
  end

  def dump_schema
    # Generate the schema on start/reload
    FileUtils.mkdir_p SCHEMA_DIR
    result = JSON.pretty_generate(execute_introspection_query)
    unless File.exists?(SCHEMA_PATH) && File.read(SCHEMA_PATH) == result
      File.write(SCHEMA_PATH, result)
    end
  end
end

Schema.extend RelaySchemaHelpers
