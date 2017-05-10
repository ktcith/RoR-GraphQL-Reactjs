if ENV["SENTRY_DSN"]
  Raven.configure do |config|
    config.dsn = ENV["SENTRY_DSN"]
    config.environments = ["development", "production"]
  end
end