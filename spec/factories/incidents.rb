FactoryGirl.define do
  factory :incident do
    transient do
      account nil
      with_initial_response nil
    end

    sequence(:name) {|n| "My Incident #{n}" }
    started_on "2017-01-09"
    ended_on "2017-02-09"
    description "MyText"
    operational_period_hours 24
    archived false

    trait :valid do
      incident_type :incident
      incident_classification :type5
      time_zone 'America/Chicago'

      after(:build) do |obj, ev|
        if ev.account
          obj.account = ev.account
        end

        # if you give both a created_by and an account, use the given account and make sure the user has that membership too
        account_traits = [:valid].compact
        obj.account ||= create(:account, *account_traits)
      end
    end
  end
end
