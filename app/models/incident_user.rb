class IncidentUser < ApplicationRecord
  belongs_to :user
  belongs_to :incident
  belongs_to :account

  extend Enumerize
  enumerize :role, in: [:owner, :admin, :user], default: :user, predicates: {prefix: true} # prefix means e.g. user.user_role_admin?
end
