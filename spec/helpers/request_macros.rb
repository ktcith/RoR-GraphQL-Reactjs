module RequestMacros
  def login_admin
    before(:each) do
      # @request.env["devise.mapping"] = Devise.mappings[:user]
      user = FactoryGirl.create(:user, :valid, is_super: true)
      sign_in_as user
    end
  end

  def login_user(account: nil, user: nil)
    raise "Don't use this - it isn't working as you'd expect - doesn't get called after each or properly reference user. Just call sign_in_as user in your own before"

    before(:each) do
      # @request.env["devise.mapping"] = Devise.mappings[:user]
      user ||= self.try(:user) || FactoryGirl.create(:user, :valid)
      if account && user.memberships.where(account_id: account.id).count = 0
        account.memberships.create(user: user, role: :user)
      end
      sign_in_as user
    end
  end
end
