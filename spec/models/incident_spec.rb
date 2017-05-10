require 'rails_helper'

RSpec.describe Incident, type: :model do
  it "saves when valid" do
    expect(FactoryGirl.create(:incident, :valid).persisted?).to be_truthy
  end
end
