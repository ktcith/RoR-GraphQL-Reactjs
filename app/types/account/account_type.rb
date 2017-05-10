AccountType = GraphQL::ObjectType.define do
  name 'Account'
  interfaces [GraphQL::Relay::Node.interface, RecordInterface]

  global_id_field :id
  field :name, types.String, "Name"
  field :description, types.String, "Description"

  field :incidents, types[IncidentType], "Provides incidents of this user." do
    resolve -> (user, args, ctx) {
      user.incidents.accessible_by(ctx[:current_ability]).reorder(created_at: :desc)
    }
  end

end
