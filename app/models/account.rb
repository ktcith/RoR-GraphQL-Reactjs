class Account < ApplicationRecord
  has_many :memberships
  has_many :incidents
  has_many :users, through: :memberships
  validates :name, presence: true

  CreateAccountResult = Struct.hash_initialized(:account, :planning_tools)

  def self.create_account(inputs)
    inputs = inputs.to_h.symbolize_keys

    Account.transaction do
      account = Account.new(
        inputs.slice(
          :name,
          :description,
        )
      )
      yield account if block_given?

      account.save
      # if account.save
      #   # created_planning_tools = account.ensure_planning_tools!
      #   # account.ensure_task_templates!
      # end

      CreateAccountResult.new(
         account: account,
      )
    end
  end

  def to_s
    if name.blank?
      "Unnamed Account #{id}"
    else
      name
    end
  end

  def icon
    Icon.new(Account, 'account')
  end

  protected

  def invite_existing_user(user:, role:, email:)
    if user.membership_for(self)
      {
        error: "Your submit was ignored because a user with email #{email.inspect} already has a membership to this account.",
      }
    else
      newMembership = Membership.create({
        user: user,
        account: self,
        role: role,
      })
      user.generate_new_membership_email(self)

      connection = GraphQL::Relay::RelationConnection.new(self.memberships, {})
      edge = GraphQL::Relay::Edge.new(newMembership, connection)
      {
        info: "Existing user with email #{email.inspect} granted membership to account.",
        newMembership: newMembership,
        membershipEdge: edge,
      }
    end
  end

  def invite_new_user(first_name:, last_name:, email:, role:, company_or_agency:)
    pass = Devise.friendly_token
    newUser = User.create!( {
      first_name: first_name,
      last_name: last_name,
      email: email,
      company_or_agency: company_or_agency,
      is_super: false,
      password: pass,
      password_confirmation: pass,
    })
    newUser.generate_reset_password_email(self)

    newMembership = Membership.create!({
      user: newUser,
      account: self,
      role: role,
    })

    connection = GraphQL::Relay::RelationConnection.new(self.memberships, {})
    membershipEdge = GraphQL::Relay::Edge.new(newMembership, connection)
    connection = GraphQL::Relay::RelationConnection.new(self.users, {})
    userEdge = GraphQL::Relay::Edge.new(newUser, connection)

    {
      newMembership: newMembership,
      membershipEdge: membershipEdge,
      newUser: newUser,
      userEdge: userEdge,
      info: "New user created and invited to account."
    }
  end

end
