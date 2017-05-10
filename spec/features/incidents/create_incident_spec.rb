require "rails_helper"

feature "Current User Create Incident Spec" do
  let(:user) {FactoryGirl.create(:user, :valid)}
  let(:account) {FactoryGirl.create(:account, :valid)}

  before do
    authenticate_user(user)
  end

  scenario "User with Account sees create incident button" do
    membership = Membership.create!({role: :user, user: user, account: account})
    react_visit("/")
    expect(page).to have_css('button#create_incident')
  end

  scenario "User with Account creates incident" do
    membership = Membership.create!({role: :user, user: user, account: account})
    react_visit("/")
    click_button "Create Incident"
    fill_in 'Name', with: "Incident 1234"
    fill_in 'Started On', with: "01/12/2017"
    fill_in 'City', with: "North Little Rock"
    fill_in 'State', with: "AR"
    fill_in 'Description', with: "Incident Description"
    click_button "Submit"
    expect(page).to have_content("Incident 1234")
  end

  scenario "User with no account does not see create incident button" do
    react_visit("/")
    expect(page).to_not have_css('button#create_incident')
  end
end
