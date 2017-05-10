require 'capybara/rails'
require 'capybara/rspec'
require 'capybara/poltergeist'

Capybara.register_driver :selenium do |app|
  Capybara::Selenium::Driver.new(
    app,
    browser: :chrome,
  )
end

module Capybara
  POLTERGEIST_OPTIONS = {
    js_errors: true,
    # timeout: 5,
  }
end

Capybara.register_driver :poltergeist do |app|
  Capybara::Poltergeist::Driver.new(app, Capybara::POLTERGEIST_OPTIONS)
end

Capybara.register_driver :poltergeist_debug do |app|
  Capybara::Poltergeist::Driver.new(app, Capybara::POLTERGEIST_OPTIONS.merge(inspector: true))
end

Capybara.register_driver :selenium_firefox do |app|
  Capybara::Selenium::Driver.new(
    app,
    browser: :firefox,
    # desired_capabilities: Selenium::WebDriver::Remote::Capabilities.firefox(marionette: false)
  )
end

# Capybara.javascript_driver = :poltergeist
# Capybara.javascript_driver = :poltergeist_debug

# https://github.com/facebook/react/issues/2455
module Capybara
  module Selenium
    class Node
      alias :_orig_set :set

      def set value
        begin
          _orig_set(" ")
          native.send_keys :backspace
        rescue
        end
        _orig_set value
      end
    end
  end
end

RSpec.configure do |config|
  config.before(:suite) do
    # Truncate database to clean up garbage from
    # interrupted or badly written examples
    DatabaseCleaner.clean_with(:truncation)
    # Seed dataase. Use it only for essential
    # to run application data.
    load "#{Rails.root}/db/seeds.rb"
  end

  config.around(:each) do |example|
    # For feature Specs Use Selenium and Truncation Strategy for Database Cleaner
    if [:feature].include? example.metadata[:type]
      Capybara.current_driver = (ENV["DRIVER"] || :selenium).to_sym
      DatabaseCleaner.strategy = :truncation
    else
      DatabaseCleaner.strategy = :transaction
    end

    DatabaseCleaner.cleaning do
      example.run
    end

    if [:feature].include? example.metadata[:type]
      load "#{Rails.root}/db/seeds.rb"
    end

    Capybara.reset_sessions!
  end

  config.before(:each) do |example|
    if [:feature].include? example.metadata[:type]
      if Capybara.current_driver == :selenium
        page.driver.browser.manage.window.resize_to(1280, 768)
      end
    end
  end

  config.after(:each) do |example|
    if [:feature].include? example.metadata[:type]
      if Capybara.current_driver.to_s =~ /poltergeist/
        # This doesn't work, but the special block for poltergeist may be useful to keep around
        sleep 0.2
        page.driver.reset!
        sleep 0.2
        Capybara.reset_sessions!
        sleep 0.2
      end
    end
  end
end
