DateType = GraphQL::ScalarType.define do
  name 'Date'
  description 'Ruby Date in iso8601 format.'
  coerce_input ->(value) { DateTime.iso8601 value }
  coerce_result ->(value) { value.iso8601 }
end
