if defined? Airbrake
  Airbrake.configure do |config|
    config.api_key = 'af492bfca54ed0718be4bafa84243c4d'
    config.host    = 'errbit.cteh.com'
    config.port    = 443
    config.secure  = config.port == 443
    config.user_attributes = [:id, :name, :email]
  end
end
