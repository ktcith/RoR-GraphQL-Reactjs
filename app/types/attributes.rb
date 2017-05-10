class Attributes
  def self.params_from_hash(hash, ctx)
    params = {}
    hash.each do |key, value|
      if value.kind_of?(Array)
        # puts '--- Array ---'
        params["#{key}_attributes"] = value.map do |v|
          params_from_hash(v, ctx )
        end
      elsif value.kind_of?(Hash)
        # puts '--- Hash ---'
        params["#{key}_attributes"] = self.params_from_hash(value, ctx)
      elsif (key == "id" || key.ends_with?("_id"))
        int_item_id = nil
        if(value)
          type_name, item_id = GraphQL::Schema::UniqueWithinType.decode(value)
          if (item_id)
            int_item_id = Integer(item_id)
          end
        end
        params[key] = int_item_id
      elsif key == '__dataID__'
        # puts '--- dataID ---'
        # ignore
      else
        # puts '--- key ---'
        # puts "#{key.inspect} #{value.inspect}"
        params[key] = value
      end
    end
    params
  end

  def self.from(json, ctx)
    hash = ActiveSupport::JSON.decode(json)
    puts hash
    self.params_from_hash(hash, ctx)
  end
end
