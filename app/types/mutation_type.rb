MutationType = GraphQL::ObjectType.define do
  name "RootMutation"
  description "root mutation"
  field :sign_in, field: SignIn.field
  field :sign_out, field: SignOut.field
  field :create_incident, field: CreateIncident.field

end
