module ControllerMacros
  def login_admin
    before(:each) do
      @request.env["devise.mapping"] = Devise.mappings[:user]
      user = FactoryGirl.create(:user, :valid, is_super: true)
      sign_in user
    end
  end

  def login_user(account: nil, user: nil)
    before(:each) do
      @request.env["devise.mapping"] = Devise.mappings[:user]
      user ||= FactoryGirl.create(:user, :valid)
      account ||= FactoryGirl.create(:account, :valid)
      if user.memberships.where(account_id: account.id).count = 0
        account.memberships.create(user: user, role: :user)
      end
      sign_in user
    end
  end
end
