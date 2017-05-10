# Set the value that means not deleted to 0 datetime. This allows unique constraints that include deleted_at.
# Otherwise unique constraints will not trigger if any columns are null
Paranoia.default_sentinel_value = Time.at(0).in_time_zone("UTC")
