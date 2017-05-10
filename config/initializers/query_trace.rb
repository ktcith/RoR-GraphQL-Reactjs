if Rails.env.development? || ENV["QUERY_TRACE"]
  ActiveRecordQueryTrace.enabled = true
  ActiveRecordQueryTrace.lines = 1
end