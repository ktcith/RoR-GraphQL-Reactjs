# Be sure to restart your server when you modify this file.

Rails.application.config.session_store :redis_store,
  expires_in: 30.days,
  servers: "#{Rails.application.config.x.redis_base}/#{ENV['SESSION_REDIS_DB'] || 0}/#{Rails.application.config.x.redis_ns_prefix}_session"
