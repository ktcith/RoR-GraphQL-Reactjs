require 'rails_helper'

RSpec.describe "CreateIncidentMutation", type: :request do
  context "graphql" do
    let(:current_user) { FactoryGirl.create(:user, :valid, account: account) }
    let(:account) { FactoryGirl.create(:account, :valid) }
    let(:example) { FactoryGirl.build(:incident, :valid, account: account) }

    def run_valid_query
      query = <<-EOS
        mutation example($input: CreateIncidentInput!) {
          create_incident(input: $input) {
            user {
              to_s
              incidents {
                name
              }
            }
          }
        }
      EOS

      account_id = Schema.id_from_object(account, AccountType, {})
      variables = {
        input: example.slice(
          :name,
          :started_on,
          :city,
          :state,
          :incident_type,
          :incident_classification,
          :time_zone,
        ).merge(account_id: account_id)
      }

      # puts variables.to_json
      post queries_path, params: { query: query, variables: variables.to_json, format: :json }
    end

    describe "#Should create a valid incident when an authorized user is logged in" do
      before do
        authenticate_user current_user
      end

      it "works" do
        run_valid_query
        print_filtered
        expect(response.parsed_body["data"]["create_incident"].include?("error")).not_to be
        expect(response.parsed_body["data"]["create_incident"].to_s).to match(example.name)
      end
    end

    describe "#Should not create an incident without an authorized user logged in" do
      it "correctly fails" do
        run_valid_query
        print_filtered
        expect(response.parsed_body["errors"]).to be
      end
    end
  end
end
