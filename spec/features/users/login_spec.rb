require "rails_helper"

feature "Login Spec" do

  let(:super_user) {FactoryGirl.create(:user, :pass12345678, :super)}

  before do
    visit "/"
    page.execute_script("localStorage.clear()")
    visit "/"
  end

  scenario "Anonymous User Accesses Login Page" do
    visit "/"
    wait_for_react
    expect(page).to have_content "Login"
  end

  scenario "Anonymous logs in with valid credentials" do
    visit "/"
    page.find_by_id("application")
    within("#loginForm") {
      fill_in 'Email', with: super_user.email
      fill_in 'Password', with: "12345678"
      click_button 'Login'
    }
    expect(page).to have_content "Logout"
  end

  scenario "Anonymous fails to login with invalid password" do
    visit "/"
    page.find_by_id("application")
    within("#loginForm") {
      fill_in 'Email', with: super_user.email
      fill_in 'Password', with: "invalid-password"
      click_button 'Login'
    }
    expect(page).to have_content "Please check your password and try again"
  end

  scenario "Anonymous fails to login with invalid email" do
    visit "/"
    page.find_by_id("application")
    within("#loginForm") {
      fill_in 'Email', with: "invalid-email@cteh.com"
      fill_in 'Password', with: "invalid-password"
      click_button 'Login'
    }
    expect(page).to have_content "Please check your email and try again or contact support."
  end

  scenario "Anonymous logs in with valid credentials after failing with invalid invalid credentials" do
    visit "/"
    page.find_by_id("application")
    within("#loginForm") {
      fill_in 'Email', with: "invalid-email@cteh.com"
      fill_in 'Password', with: "invalid-password"
      click_button 'Login'
    }
    expect(page).to have_content "Please check"
    page.find_by_id("application")
    within("#loginForm") {
      fill_in 'Email', with: super_user.email
      fill_in 'Password', with: "12345678"
      click_button 'Login'
    }
    expect(page).to have_content "Logout"
  end

end
