require "rails_helper"

feature "SignOut Spec" do

  let(:super_user) {FactoryGirl.create(:user, :pass12345678, :super)}

  before do
    visit "/"
    page.execute_script("localStorage.clear()")
    visit "/"
  end

  scenario "Anonymous logs in with valid credentials and logs out" do
    page.find_by_id("application")
    within("#loginForm") {
      fill_in 'Email', with: super_user.email
      fill_in 'Password', with: "12345678"
      click_button 'Login'
    }
    click_link "Logout"
    using_wait_time(5) do
      expect(page).to have_content "Login"
    end
  end

end
