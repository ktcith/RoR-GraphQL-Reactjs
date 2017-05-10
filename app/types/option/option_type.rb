OptionType = GraphQL::ObjectType.define do
  name 'Option'
  description 'Appropriate for a drop down.'

  field :value, types.String, hash_key: :value
  field :label, types.String, hash_key: :label
end
