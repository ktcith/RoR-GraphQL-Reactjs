QueryType = GraphQL::ObjectType.define do
  name "Query"
  description "The query root for this schema"
  interfaces [GraphQL::Relay::Node.interface]
  field :node, GraphQL::Relay::Node.field

  field :root do
    type RootType
    description "root is the root node"
    resolve -> (obj, args, ctx) do
      Root.new
    end
  end

end
