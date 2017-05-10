require_relative 'boot'
require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module GraphqlRubyDemo
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.
    config.autoload_paths << Rails.root.join('lib')
    config.eager_load_paths << Rails.root.join('app', 'models', 'validators')

    Dir["#{Rails.root.to_s}/app/types/**/**"].each do |path|
      config.eager_load_paths << path
    end
    Dir["#{Rails.root.to_s}/app/types/**"].each do |path|
      config.eager_load_paths << path
    end

    config.eager_load_paths << Rails.root.join('app','types')

    config.active_job.queue_adapter = :sidekiq

    # these will be used in other configurations
    config.x.redis_ns_prefix = ENV['REDIS_NS_PREFIX'] || 'rptest'
    config.x.redis_base = "redis://#{ENV['REDIS_HOST'] || 'localhost'}:#{ENV['REDIS_PORT'] || '6379'}"
    # Theoretically shouldn't need to set namespace, but redis-rails doesn't parse it out correctly from the url
    config.cache_store = :redis_store, "#{config.x.redis_base}/#{config.x.redis_ns_prefix}_cache", { namespace: "#{config.x.redis_ns_prefix}_cache", expires_in: 90.minutes }
  end
end
