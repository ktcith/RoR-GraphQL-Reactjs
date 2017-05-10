DateTimeType = GraphQL::ScalarType.define do
  name 'DateTime'
  description 'Ruby DateTime in iso8601 format.'
  coerce_input ->(value) { DateTime.iso8601 value }
  coerce_result ->(value) { value.iso8601 }
end
