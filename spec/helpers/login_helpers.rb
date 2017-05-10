module LoginHelpers

  def authenticate_user(user, use_token = false)
    if use_token
      visit "/"
      cmd = "localStorage.setItem('accessToken','#{user.access_token}')"
      page.execute_script(cmd);
    else
      login_as(user, scope: :user)
    end
  end

  def login_super
    visit "/"
    fill_in 'Email', with: 'jrhicks@cteh.com'
    fill_in 'Password', with: '1234567'
    click_button 'Login'
  end
end
