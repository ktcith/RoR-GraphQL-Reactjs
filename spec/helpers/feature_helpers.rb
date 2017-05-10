module FeatureHelpers
  # http://stackoverflow.com/questions/8996267/is-there-a-way-to-print-javascript-console-errors-to-the-terminal-with-rspec-cap
  def check_browser_logs_after_each_test(enforce_no_logs=false)
    before(:each) { |example| save_browser_logs(example) }
    prepend_after(:each) { |example| check_new_browser_logs(example, enforce_no_logs) }
  end

  def save_browser_logs(example)
    return unless Capybara.current_driver == :selenium
    @prev_browser_logs = page.driver.browser.manage.logs.get(:browser)
  end

  def check_new_browser_logs(example, enforce_no_logs=false)
    return unless Capybara.current_driver == :selenium
    logs = page.driver.browser.manage.logs.get(:browser)
    new_logs = logs - @prev_browser_logs
    if example.exception
      s = new_logs.map { |l| l.to_s }.join("\n")
      # example.exception.message << "\nConsole logs:\n#{s}"
      raise "Console logs:\n#{s}" if s.present?
      # puts "Console logs:\n#{s}"
    else
      if enforce_no_logs
        expect(new_logs).to eq([])
      end
    end
  end

  # These next few don't work with Selenium, keeping them here in case we use capybara-webkit at some point
  def content_type
    response_headers["Content-Type"]
  end

  def content_disposition
    response_headers["Content-Disposition"]
  end

  def download_filename
    content_disposition.scan(/filename="(.*)"/).last.first
  end

  def pdf_body
    temp_pdf = Tempfile.new('pdf')
    temp_pdf << page.source.force_encoding('UTF-8')
    reader = PDF::Reader.new(temp_pdf)
    reader.pages.first.text
  end

  def fill_in_contenteditable(selector, options)
    editor = find(selector)
    editor.set(options[:with])
  end
end

RSpec.configure do |config|
  config.before(:each) do |example|
    if [:feature].include? example.metadata[:type]
      save_browser_logs(example)
    end
  end

  config.prepend_after(:each) do |example|
    if [:feature].include? example.metadata[:type]
      check_new_browser_logs(example)
    end
  end
end
