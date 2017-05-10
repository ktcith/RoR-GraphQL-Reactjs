IncidentType = GraphQL::ObjectType.define do
  name 'Incident'
  description 'To be documented'
  interfaces [GraphQL::Relay::Node.interface, RecordInterface]

  global_id_field :id

  field :to_s, !types.String, "To String (Record Interface)"
  field :icon, IconType, "Icon (Record Interface)"
  field :name, types.String, "Name"
  field :started_on, types.String, "Started On"
  field :ended_on, types.String, "Ended On"
  field :city, types.String, "City"
  field :state, types.String, "State"
  field :description, types.String, "Description"
  field :status, types.String, "Status"

  field :incident_type, types.String, "Incident Type Identifier"
  field :incident_type_text, types.String, "Incident Type Text"

  field :incident_classification, types.String, "Incident Complexity Identifier"
  field :incident_classification_text, types.String, "Incident Complexity Text"

  field :time_zone, types.String, "Time Zone"
  field :created_at, types.String
  field :updated_at, types.String

  field :users, types[UserType] do
    resolve -> (incident, args, ctx) {
      incident.users.accessible_by(ctx[:current_ability]) || []
    }
  end

end
