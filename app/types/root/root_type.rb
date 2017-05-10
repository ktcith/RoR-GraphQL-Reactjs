RootType = GraphQL::ObjectType.define do
  name 'Root'
  description 'Root Node'
  interfaces [GraphQL::Relay::Node.interface]

  field :id, !types.ID

  field :current_user, UserType do
    resolve -> (object, args, ctx) {
      ctx[:current_user]
    }
  end

  field :incident, IncidentType do
    argument :id, !types.ID
    resolve -> (object, args, ctx) {
      Schema.object_from_id(args[:id], ctx)
    }
  end

  field :incidents, types[IncidentType] do
    argument :time_zone, types.String
    argument :incident_type, types.String
    argument :incident_category, types.String
    resolve -> (object, args, ctx) {
      incidents = Incident.accessible_by(ctx[:current_ability])
      if args[:time_zone]
        incidents = incidents.where({time_zone: args[:time_zone]})
      end
      if args[:incident_type]
        incidents = incidents.where({incident_type: args[:incident_type]})
      end
      if args[:incident_category]
        incidents = incidents.where({incident_category: args[:incident_category]})
      end
      incidents
    }
  end

  field :zone_options, types[OptionType] do
    argument :international, types.Boolean
    resolve -> (object, args, ctx) {
      if args[:international]
        ActiveSupport::TimeZone.all.map { |zone|
          { value: zone.tzinfo.identifier, label: zone.name }
        }
      else
        ActiveSupport::TimeZone.us_zones.map { |zone|
          { value: zone.tzinfo.identifier, label: zone.name }
        }
      end
    }
  end

  field :incident_type_options, types[OptionType] do
    resolve -> (object, args, ctx) {
      Incident.enumerized_attributes[:incident_type].options.map {|x| { label: x[0], value: x[1]} }
    }
  end

  field :incident_classification_options, types[OptionType] do
    resolve -> ( object, args, ctx ) {
      Incident.enumerized_attributes[:incident_classification].options.map {|x| { label: x[0], value: x[1]} }
    }
  end

end
