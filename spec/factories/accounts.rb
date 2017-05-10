FactoryGirl.define do
  factory :account do
    trait :valid do
      sequence(:name) { |n| "Account #{n}" }
      description 'My Description'
    end
  end
end
