Sidekiq.configure_server do |config|
  config.redis = { url: [Rails.configuration.x.redis_base, ENV['SIDEKIQ_REDIS_DB'] || 1].join('/'), namespace: "#{Rails.application.config.x.redis_ns_prefix}_sidekiq" }
end

Sidekiq.configure_client do |config|
  config.redis = { url: [Rails.configuration.x.redis_base, ENV['SIDEKIQ_REDIS_DB'] || 1].join('/'), namespace: "#{Rails.application.config.x.redis_ns_prefix}_sidekiq" }
end

if Rails.env.development? && ENV['SIDEKIQ_INLINE']
  require 'sidekiq/testing'
  Sidekiq::Testing.inline!
end

