FactoryGirl.define do
  factory :user do
    transient do
      incident_id nil
      incident nil
      incident_role :admin
      account_id nil
      account nil
      account_role :admin
    end

    trait :super do
      is_super true
    end

    trait :pass12345678 do
      sequence(:first_name) { |n| "User #{n}" }
      last_name 'Last Name'
      sequence(:email) { |n| "user#{n}@example.com" }

      pass = '12345678'
      password { pass }
      password_confirmation { pass }
    end

    trait :valid do
      sequence(:first_name) { |n| "User #{n}" }
      last_name "Last Name"
      company_or_agency "Example Corp"
      sequence(:email) { |n| "user#{n}@example.com" }

      pass = Devise.friendly_token
      password { pass }
      password_confirmation { pass }
    end

    after(:create) do |user, evaluator|
      if evaluator.try(:incident_id) || evaluator.try(:incident)
        IncidentUser.create(user: user, incident_id: evaluator.try(:incident_id) || evaluator.incident.id, role: evaluator.try(:incident_role))
      end

      if evaluator.try(:account_id) || evaluator.try(:account)
        Membership.create(user: user, account_id: evaluator.try(:account_id) || evaluator.account.id, role: evaluator.try(:account_role))
      end
    end
  end
end
