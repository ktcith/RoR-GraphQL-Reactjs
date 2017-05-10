# https://gist.github.com/theorygeek/85b2f7df6931a0eb3f06141ef1e57f30

module GraphQL
  module Language
    class MergedQuery
      attr_accessor :original_queries, :original_variables

      def initialize(queries, variables)
        @original_queries = queries
        @original_variables = variables
        @fragment_counter = 0
      end

      def combine!
        @mappings = original_queries.each_with_index.map do |query, index|
          MergedQuery.sanitize(query, index)
        end

        @combined_document = MergedQuery.combine_documents(@mappings.map { |m| m[:document] })
      end

      def combined_text
        @combined_text ||= GraphQL::Language::Generation.generate(@combined_document)
      end

      def input_mappings
        @mappings.map { |m| m[:input_mappings] }
      end

      def output_mappings
        @mappings.map { |m| m[:output_mappings] }
      end

      def mapped_inputs
        result = {}
        original_variables.zip(@mappings).each do |variables, mapping|
          next if variables.blank?

          mapping[:input_mappings].each do |old_key, new_key|
            result[new_key] = variables[old_key]
          end
        end

        result
      end

      def execute_combined(schema, **kwargs)
        query = GraphQL::Query.new(schema, document: @combined_document, variables: mapped_inputs, **kwargs)
        query.result
      end

      def split_results(combined_result)
        @mappings.map do |mapping|
          query_result = {}

          if combined_result.include?('errors')
            query_result['errors'] = combined_result['errors']
          end

          if combined_result.include?('data')
            query_result['data'] = {}

            mapping[:output_mappings].each do |new_key, old_key|
              query_result['data'][old_key] = combined_result['data'][new_key]
            end
          end

          query_result
        end
      end

      def execute(schema, **kwargs)
        split_results(execute_combined(schema, **kwargs))
      end

      def self.alias_name(name, index)
        "q#{index}_#{name}"
      end

      def self.sanitize(query_text, query_index)
        # Parse the query
        document = GraphQL.parse(query_text)

        # Rename all of the fragments. Also, alias any variables that we find.
        visitor = Visitor.new(document)

        fragment_definitions = {}
        variable_mappings = {}

        visitor[Nodes::FragmentDefinition] << ->(node, _) {
          node.name = alias_name(node.name, query_index)
          fragment_definitions[node.name] = node
        }

        visitor[Nodes::FragmentSpread] << ->(node, _) {
          node.name = alias_name(node.name, query_index)
        }

        visitor[Nodes::VariableDefinition] << ->(node, _) {
          original_name = node.name
          variable_mappings[original_name] = node.name = alias_name(node.name, query_index)
        }

        visitor[Nodes::VariableIdentifier] << ->(node, _) {
          node.name = alias_name(node.name, query_index)
        }

        visitor.visit

        # Inline any fragments that are used at the top level
        operation = document.definitions.detect { |d| d.is_a?(Nodes::OperationDefinition) && d.operation_type == 'query' }

        idx = 0
        while idx < operation.selections.size
          node = operation.selections[idx]

          if node.is_a?(Nodes::FragmentSpread)
            operation.selections.delete_at(idx)

            fragment_definitions[node.name].selections.each_with_index do |selection, idx2|
              operation.selections.insert(idx + idx2, selection)
            end
          else
            idx += 1
          end
        end

        # We might have just eliminated all usages of a fragment. If so, remove it from the query.
        used_fragments = Set.new

        visitor = Visitor.new(document)
        visitor[Nodes::FragmentSpread] << ->(node, parent) { used_fragments << node.name }
        visitor.visit

        document.definitions = document.definitions.reject { |d| d.is_a?(Nodes::FragmentDefinition) && !used_fragments.include?(d.name) }

        # Alias any selections at the top level
        field_mappings = {}
        operation.selections.each do |selection|
          original_name = selection.alias || selection.name
          selection.alias = alias_name(original_name, query_index)
          field_mappings[selection.alias] = original_name
        end

        { document: document, output_mappings: field_mappings, input_mappings: variable_mappings }
      end

      def self.combine_documents(documents)
        operation = Nodes::OperationDefinition.new(operation_type: "query")
        result = Nodes::Document.new(definitions: [operation])

        documents.each do |doc|
          doc.definitions.each do |definition|
            case definition
            when Nodes::OperationDefinition
              next unless definition.operation_type == 'query'
              operation.selections.concat(definition.selections)
              operation.directives.concat(definition.directives)
              operation.variables.concat(definition.variables)
            else
              result.definitions << definition
            end
          end
        end

        result
      end
    end

    def self.merge_queries(queries, variables)
      result = MergedQuery.new(queries, variables)
      result.combine!
      result
    end
  end
end
