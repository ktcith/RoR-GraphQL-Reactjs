# Be sure to restart your server when you modify this file.

# Add new inflection rules using the following format. Inflections
# are locale specific, and you may define rules for as many different
# locales as you wish. All of these examples are active by default:
# ActiveSupport::Inflector.inflections(:en) do |inflect|
#   inflect.plural /^(ox)$/i, '\1en'
#   inflect.singular /^(ox)en/i, '\1'
#   inflect.irregular 'person', 'people'
#   inflect.uncountable %w( fish sheep )
# end

# These inflection rules are supported but not enabled by default:
ActiveSupport::Inflector.inflections(:en) do |inflect|
  inflect.acronym 'HTML'
  inflect.acronym 'PDF'
  inflect.acronym 'IAP'
  inflect.acronym 'IAPs'
  inflect.human 'IAP', 'IAP'
  inflect.acronym 'ICS2011'
  inflect.acronym 'ICS2011s'
  inflect.acronym 'ICS202A'
  inflect.acronym 'ICS202As'
  inflect.acronym 'ICS202B'
  inflect.acronym 'ICS202Bs'
  inflect.acronym 'ICS202'
  inflect.acronym 'ICS202s'
  inflect.acronym 'ICS203'
  inflect.acronym 'ICS203s'
  inflect.acronym 'ICS204'
  inflect.acronym 'ICS204s'
  inflect.acronym 'ICS205'
  inflect.acronym 'ICS205s'
  inflect.acronym 'ICS206'
  inflect.acronym 'ICS206s'
  inflect.acronym 'ICS207'
  inflect.acronym 'ICS207s'
  inflect.acronym 'ICS208'
  inflect.acronym 'ICS208s'
  inflect.acronym 'ICS209'
  inflect.acronym 'ICS209s'
  inflect.acronym 'ICS210'
  inflect.acronym 'ICS210s'
  inflect.acronym 'ICS211'
  inflect.acronym 'ICS211s'
  inflect.acronym 'ICS212'
  inflect.acronym 'ICS212s'
  inflect.acronym 'ICS213RR' # http://apidock.com/rails/ActiveSupport/Inflector/Inflections/acronym
  inflect.acronym 'ICS213RRs' # http://apidock.com/rails/ActiveSupport/Inflector/Inflections/acronym
  inflect.acronym 'ICS213'
  inflect.acronym 'ICS213s'
  inflect.acronym 'ICS214'
  inflect.acronym 'ICS214s'
  inflect.acronym 'ICS234'
  inflect.acronym 'ICS234s'
  inflect.acronym 'ICS2013'
  inflect.acronym 'ICS2013s'
  inflect.acronym 'ICS2014'
  inflect.acronym 'ICS2014s'
  inflect.acronym 'ICS203'
  inflect.acronym 'ICS203s'


  inflect.acronym 'ICS230'
  inflect.acronym 'ICS230s'
  inflect.acronym 'ICS233'
  inflect.acronym 'ICS233s'
  inflect.acronym 'ICS215A' # needs to be before ICS215 (without a) order matters
  inflect.acronym 'ICS215As' # needs to be before ICS215 (without a) order matters
  inflect.acronym 'ICS215'
  inflect.acronym 'ICS215s'

  # Meetings
  inflect.acronym 'GSM'
  inflect.acronym 'OM'
  inflect.acronym 'OMP'
  inflect.acronym 'IB'
  inflect.acronym 'IBP'
  inflect.acronym 'TM'
  inflect.acronym 'TMP'
  inflect.acronym 'PM'
  inflect.acronym 'PMP'

  inflect.acronym 'IC'
  inflect.acronym 'UC'
  inflect.acronym 'ICUC'


  inflect.irregular 'division_or_group', 'divisions_and_groups'
  inflect.irregular 'task_or_action', 'tasks_and_actions'

  inflect.acronym 'UOM'
end
