# This file is copied to spec/ when you run 'rails generate rspec:install'
ENV["RAILS_ENV"] ||= "test"
require File.expand_path('../../config/environment', __FILE__)
# Prevent database truncation if the environment is production
abort("The Rails environment is running in production mode!") if Rails.env.production?
require 'spec_helper'
require 'rspec/rails'
require 'sidekiq/testing'
Sidekiq::Testing.inline!

ActiveRecord::Migration.maintain_test_schema!

RSpec.configure do |config|
  config.use_transactional_fixtures = false   # Capybara / Selenium messes this up
  config.fixture_path = "#{::Rails.root}/spec/fixtures"
  config.infer_spec_type_from_file_location!
  config.before(:each) { ActionMailer::Base.deliveries.clear }
end

def expect_status_or_print(expected_status, filter_body: true, max_length: 1000)
  unless response.status == expected_status
    print_filtered(filter_body: filter_body, max_length: max_length)
  end

  expect(response).to have_http_status(expected_status)
end

def print_filtered(filter_body: true, max_length: 1000)
  # puts "headers: #{response.headers}"
  filtered_body = response.body
  if filter_body
    unless filtered_body =~ /\A.*[\[{]/ # Don't filter JSON body
      filtered_body = /.*?\<div.*?\>(.*)/m.match(filtered_body).try(:[], 1)
    end
  end
  filtered_body = filtered_body.to_s[0...max_length]
  # puts filtered_body
  filtered_body
end

def sample_xls_path
  Rails.root.join("spec", "files", "simple.xls")
end

def sample_xlsx_path
  Rails.root.join("spec", "files", "simple.xlsx")
end

def sample_pdf_path
  Rails.root.join("spec", "files", "211p.pdf")
end

def corrupt_pdf_path
  Rails.root.join("spec", "files", "pdfCabinetOfHorrors", "encryption_nocopy.pdf")
end

def sample_image_path
  Rails.root.join("spec", "files", "photo1.jpg")
end

def expect_consistent_associations_for(model_name, association_name)
  def expect_consistent_associations(model, association_name)
    if association_name == :period
      expect(model.period.incident_id).to eq(model.incident_id)
      expect(model.period.account_id).to eq(model.account_id)
      expect(model.period.incident.account_id).to eq(model.account_id)
    end
    expect(model.incident.account_id).to eq(model.account_id)
  end

  it "has no arguments" do
    model = FactoryGirl.create(model_name, :valid)
    expect_consistent_associations(model, association_name)
  end

  if association_name == :period
    it "is given period" do
      period = FactoryGirl.create(:period, :valid)
      model = FactoryGirl.create(model_name, :valid, period: period)
      expect_consistent_associations(model, association_name)
      expect(model.incident_id).to eq(period.incident_id)
    end

    it "is given period and account (uses period's account)" do
      period = FactoryGirl.create(:period, :valid)
      account = FactoryGirl.create(:account, :valid)
      model = FactoryGirl.create(model_name, :valid, period: period, account: account)
      expect(model.period_id).to eq(period.id)
      expect_consistent_associations(model, association_name)
      expect(model.account_id).to eq(period.account_id)
    end
  end

  it "is given incident" do
    incident = FactoryGirl.create(:incident, :valid)
    model = FactoryGirl.create(model_name, :valid, incident: incident)
    expect(model.incident_id).to eq(incident.id)
    expect_consistent_associations(model, association_name)
  end

  it "is given account" do
    account = FactoryGirl.create(:account, :valid)
    model = FactoryGirl.create(model_name, :valid, account: account)
    expect(model.account_id).to eq(account.id)
    expect_consistent_associations(model, association_name)
  end
end

def expect_full_access_for(ability, model, immutable: false)
  expect(ability.can?(:read, model)).to be
  expect(ability.can?(:create, model)).to be
  expect(ability.can?(:update, model)).to be unless immutable
end

def expect_no_access_for(ability,model)
  expect(ability.can?(:read, model)).not_to be
  expect(ability.can?(:create, model)).not_to be
  expect(ability.can?(:update, model)).not_to be
end

def expect_read_only_access_for(ability,model)
  expect(ability.can?(:read, model)).to be
  expect(ability.can?(:create, model)).not_to be
  expect(ability.can?(:update, model)).not_to be
end

def expect_index_access_for(ability, relation)
  expect(relation.any?).to be, "Invalid test: there are no items available to test ability"
  expect(relation.accessible_by(ability).any?).to be
end

def expect_no_index_access_for(ability, relation)
  expect(relation.accessible_by(ability).any?).not_to be
end

def retry_expect(matcher, retries = 5, &block)
  retries.times do |i|
    actual = yield(i)
    if i == retries - 1
      expect(actual).to matcher
    else
      # fall through if fail, stop try if succeed
      break if matcher.matches?(actual)
    end

    sleep (0.1 * i) # at default 5 retries total sleep is 1.5 seconds
  end
end

Dir[Rails.root.join('spec/support/**/*.rb')].each { |f| require f }
