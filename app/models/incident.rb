class Incident < ApplicationRecord
  belongs_to :account
  has_many :incident_users

  extend Enumerize
  enumerize :incident_type, in: [:drill, :incident, :event], default: :incident, predicates: {prefix: true} # prefix means e.g. user.incident_type_drill?
  enumerize :incident_classification, in: [:type1, :type2, :type3, :type4, :type5], default: :type5, predicates: {prefix: true}

  def to_s
    name
  end

  def icon
    Icon.new(Incident, 'open_folder', 'utility')
  end

end
