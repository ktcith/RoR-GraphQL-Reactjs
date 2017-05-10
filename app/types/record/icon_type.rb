IconType = GraphQL::ObjectType.define do
  name 'Icon'
  description 'The icon that represents a record in the database.'

  field :legend, !types.String, "This is the record type.  Usually the rails class name."
  field :category, !types.String, "See lightning design documentation for categories."
  field :icon, !types.String, "See lightning design for icons."
end
