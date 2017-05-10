class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :lockable

  has_many :incident_users
  has_many :incidents, through: :incident_users
  has_many :memberships
  has_many :accounts, through: :memberships
  after_create :update_access_token!

  def to_s
    fullname = [first_name, last_name].join(' ')
    if fullname.blank?
      "Unnamed User"
    else
      fullname
    end
  end

  def icon
    Icon.new(User, 'user')
  end

  def set_anonymous!
    is_anonymous = true
  end

  def set_authenticated!
    is_anonymous = false
  end

  def update_access_token!
    self.access_token = "#{self.id}:#{Devise.friendly_token}"
    self.save!
  end

  def membership_for(account)
    ms = self.memberships.where(account_id: account.id)
    if ms.length > 1
      raise "User #{self.id} has multiple memberships for account #{account.id}"
    else
      return ms.first
    end
  end

  def is_admin?
    return is_admin
  end

  def generate_reset_password_email(account)
    # TODO: initiate reset password via Devise
    #self.send_reset_password_instructions
    #NewAccountMembershipMailer.notify_new_user(self.email, account.name)
  end

  def generate_new_membership_email(account)
    # TODO: hijack confirmation_instructions to notify of new account membership instead
    #self.send_confirmation_instructions
    #NewAccountMembershipMailer.notify_registered_user(self.email, account.name)
  end

  def name
    [first_name, last_name].join(' ') || "no name set"
  end

end
