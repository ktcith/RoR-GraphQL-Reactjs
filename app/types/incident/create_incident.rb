CreateIncident = GraphQL::Relay::Mutation.define do
  name 'CreateIncident'
  description 'Create Incident'

  input_field :name, !types.String
  input_field :account_id, !types.ID
  input_field :started_on, types.String
  input_field :city, types.String
  input_field :state, types.String
  input_field :description, types.String
  input_field :incident_type, !types.String
  input_field :incident_classification, !types.String
  input_field :time_zone, !types.String

  return_field :newIncident, IncidentType
  return_field :user, UserType

  resolve -> (obj, inputs, ctx) {
    account = Schema.object_from_id(inputs[:account_id], ctx)
    user = ctx[:current_user]
    inputs = inputs.to_h.symbolize_keys

    incident = Incident.new({
      name: inputs[:name],
      account: account,
      started_on: inputs[:start_on],
      city: inputs[:city],
      state: inputs[:state],
      description: inputs[:description],
      incident_type: inputs[:incident_type],
      incident_classification: inputs[:incident_classification],
      time_zone: inputs[:time_zone]
    })

    if !ctx[:current_ability].can?(:create, incident)
      raise "Current user not allowed to create incident for account #{account.name.inspec}"
    end

    user.incident_users.create!(
      role: 'owner',
      incident: incident
    )

    {
      user: user,
      newIncident: incident
    }
  }
end
