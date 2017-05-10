class Membership < ApplicationRecord
  belongs_to :user
  belongs_to :account
  extend Enumerize
  enumerize :role, in: [:owner, :admin, :user], default: :user, predicates: {prefix: true} # prefix means e.g. user.user_role_admin?

  def is_active?
    # Alternatively in the future we may have
    # a role which is considered a non-active role
    true
  end
end
