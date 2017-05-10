FactoryGirl.define do
  factory :incident_user do
    user nil
    incident nil
    role "owner"
  end
end
