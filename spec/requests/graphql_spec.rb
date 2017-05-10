require 'rails_helper'

RSpec.describe "queries", type: :request do
  describe "POST /queries" do
    it "works" do
      post queries_path, params: { query: "{ __schema }", format: :json }
      expect(response).to have_http_status(200)
    end
  end
end
