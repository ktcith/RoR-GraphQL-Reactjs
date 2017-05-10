UserType = GraphQL::ObjectType.define do
  name 'User'
  description 'A person who uses our app'
  interfaces [GraphQL::Relay::Node.interface, RecordInterface]

  global_id_field :id

  field :to_s, !types.String, "Full user name"
  field :icon, IconType, "Structured data for an Icon"
  field :email, !types.String, "Email address"
  field :first_name, types.String, "Users first name"
  field :last_name, types.String, "Users last name"
  field :mobile_phone, types.String
  field :office_phone, types.String
  field :company_or_agency, types.String, "Users direct employer"
  field :is_super, types.Boolean, "True if the user has super user permissions."
  field :last_sign_in_at, types.String, "Last successfull sign in datetime"
  field :needs_password, types.Boolean

  field :accounts, types[AccountType], "Accounts this user had memberships too" do
    resolve -> (user, args, ctx) {
      user.accounts.accessible_by(ctx[:current_ability])
    }
  end

  field :incidents, types[IncidentType], "Provides incidents of this user." do
    resolve -> (user, args, ctx) {
      user.incidents.accessible_by(ctx[:current_ability]).reorder(created_at: :desc)
    }
  end

  field :can_create_incident, types.Boolean, "True if this user belongs to any accounts" do
    resolve -> (user, args, ctx) {
      user.accounts.any?
    }
  end

end
