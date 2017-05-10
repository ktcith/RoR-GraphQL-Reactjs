source 'https://rubygems.org'

ruby '2.3.1'

gem 'graphql', '~> 1.5.1'
# gem 'graphql-query-resolver'
# gem 'graphql', '1.4.5' # Working with author on Fragment Resolution Bug
# gem "graphql", github: "rmosolgo/graphql-ruby", branch: "ast-nodes-set"
gem 'graphiql-rails'
gem 'hashie'
gem 'devise'
gem 'pundit'
gem 'cancancan'
gem 'correct-horse-battery-staple'
gem 'geocoder'
gem 'airbrake', '~> 4.0', require: false
gem 'sentry-raven'
gem 'time_difference'

# This is an optional gem. When included, GraphQL will use a parser written in C
# instead of the Ruby parser shipped with graphql-ruby.
# gem 'graphql-libgraphqlparser'

gem 'react-rails'
gem 'rails', '~> 5.0'
gem 'dotenv-rails'
gem 'sqlite3'
gem 'sass-rails', '~> 5.0'
gem 'uglifier', '>= 1.3.0'
gem 'puma'
gem 'enumerize'
gem 'paranoia', '~> 2.2' # 2.2 or greater needed for Rails 5
gem 'paperclip', '~> 5.0.0'

# PDFs
gem 'rmagick', require: false
gem 'pdf-reader'
gem 'combine_pdf'
gem 'active_pdftk', git: "git://github.com/tcocca/active_pdftk.git"
gem 'qpdf', github: "ConsultingMD/qpdf"
gem 'princely', github: "ronaldoaraujo/princely" # This fork has a fix for Rails 5


# redis cache store
gem 'redis-rails'
gem 'redis-namespace'

# background jobs
gem 'sidekiq', '~> 4.0'
gem 'sidekiq-failures'
gem 'sidekiq-unique-jobs'

group :development, :test do
  gem 'pry'
  gem 'better_errors'
  gem 'byebug'
  gem 'spring'
  gem 'factory_girl_rails'
  gem 'rspec-rails', '~> 3.5'
  gem 'capybara'
  gem 'chromedriver-helper'  # Chrome
  gem 'selenium-webdriver'   # Firefox
  gem 'poltergeist'
  gem 'active_record_query_trace'
  gem 'faker'
end

group :development do
  gem 'web-console', '~> 2.0'
end

group :test do
  gem 'database_cleaner'
  gem 'launchy'
  gem 'timecop'
  gem 'hexapdf'
end
