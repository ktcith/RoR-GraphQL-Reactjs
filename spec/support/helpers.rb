Dir[Rails.root.join('spec/helpers/**/*.rb')].each { |f| require f }

RSpec.configure do |config|
  config.include LoginHelpers
  config.include ReactHelpers
  config.include PauseHelpers

  config.include Warden::Test::Helpers
  config.after :each do
    Warden.test_reset!
  end

  config.after :each do |example|
    if example.exception && self.respond_to?(:response) && self.response
      print_filtered
    end
  end

  config.include Devise::Test::ControllerHelpers, type: :controller
  config.extend ControllerMacros, type: :controller
  config.include RequestHelpers, type: :request
  config.extend RequestMacros, type: :request
  config.include FeatureHelpers, type: :feature
end
