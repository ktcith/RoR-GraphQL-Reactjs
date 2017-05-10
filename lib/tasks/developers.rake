namespace :developers do
  desc "Tasks friendly to developers"
  task seed: :environment do
    require 'factory_girl'

    raise 'Only works in development environment!' unless Rails.env.development?
    puts ActiveRecord::Base.connection_config.inspect

    jrhicks = User.find_by(email: 'jrhicks@cteh.com') || User.create({
        first_name: 'Jeffrey',
        last_name: 'Hicks',
        email: 'jeff@example.com',
        password: '1234567',
        is_super: true,
        company_or_agency: 'CTEH LLC'
    })

    account_admin = User.create({
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@doe.com',
        password: '1234567',
        is_super: false,
        company_or_agency: 'CTEH LLC'
    })

    incident_admin = User.create({
        first_name: 'Jane',
        last_name: 'doe',
        email: 'jane@example.com',
        password: 'user3password',
        is_super: false,
        company_or_agency: 'CTEH LLC'
    })

    # consistent access tokens
    # jrhicks.update_attributes!(access_token: "1:KkriPaLxKiTS3DkLjyKv")
    # account_admin.update_attributes!(access_token: "2:RsvobgA5LevfVLxCQcvY")
    # incident_admin.update_attributes!(access_token: "3:UkdBeDtYCYpkJECaFk_m")

    users = User.where("email like '%cteh.com' OR email LIKE '%example.com'")
    cteh = Account.find_by(name: 'CTEH, LLC.') || Account.create_account(name: 'CTEH, LLC.', description: 'CTEH').account
    shell_account = Account.find_by(name: 'Shell') || Account.create_account(name: 'Shell', description: 'Shell').account

    shell_account.memberships.create(user: jrhicks, role: :owner) unless Membership.find_by(user: jrhicks, account: shell_account)
    shell_account.memberships.create(user: jrhicks, role: :owner) unless Membership.find_by(user: jrhicks, account: shell_account)
    shell_account.memberships.create(user: account_admin, role: :admin) unless Membership.find_by(user: account_admin, account: shell_account)

    seed_incidents = [{ name: 'Convent LA - Oil Refinery Fire - Type 3 Incident', incident_classification: 'type3', incident_type: 'incident',  city: 'Convent', state: 'LA', description: 'Oil Refinery Fire' },
                      { name: 'Houston TX - Propylene Release - Type 4 Incident', incident_classification: 'type4', incident_type: 'incident', city: 'Houston', state: 'TX', description: 'Propylene Release' },
                      { name: 'Barstow TX - Well Control - Type 4 Incident', incident_classification: 'type4', incident_type: 'incident', city: 'Barstow', state: 'TX', description: 'Well Control' },
                      { name: 'La Porte TX - Ship Channel Tanker Collision - Type 1 Drill', incident_classification: 'type1', incident_type: 'drill', city: 'La Porte', state: 'TX', description: 'Ship Channel Tanker Collision' },
                      { name: 'Baton Rouge LA - Diesel Fuel Release - Type 2 Drill', incident_classification: 'type2', incident_type: 'drill', city: 'Baton Rouge', state: 'LA', description: 'Diesel Fuel Release' },
                      { name: 'Geismar LA - Ethylene Release - Type 3 Drill', incident_classification: 'type3', incident_type: 'drill', city: 'Geismar', state: 'LA', description: 'Ethylene Release' },
                      { name: 'Tracy CA - Benzene Personnel Monitoring - Type 5 Event', incident_classification: 'type5', incident_type: 'event', city: 'Tracy', state: 'CA', description: 'Benzene Personnel Monitoring' },
                      { name: 'Anacortes WA - Odor Investigation - Type 5 Event', incident_classification: 'type5', incident_type: 'event', city: 'Anacortes', state: 'WA', description: 'Odor Investigation' }
                     ]
    seed_incidents.each do |incident|
      i=Incident.new(incident)
      i.account = shell_account
      i.time_zone = 'America/Chicago'
      i.save!
    end

    Incident.all.each do |incident|
      ([account_admin, incident_admin]).each do |u|
        incident.incident_users.create(user: u, role: :admin)
      end
      incident.incident_users.create(user: jrhicks, role: :owner)
    end

  end

  desc "Generate incidents under given account_id"
  task :generate_incidents, [:account_id] => :environment do |t, args|
    require 'factory_girl'

    raise 'Only works in development environment!' unless Rails.env.development?

    user = User.find_by(email: 'jrhicks@cteh.com')
    account = args[:account_id] ? Account.find(args[:account_id]) : Account.last
    3.times do
      incident = FactoryGirl.create(:incident, :valid, account: account, created_by: user)
      incident.incident_users.create(user: user)
    end
    FactoryGirl.create(:period, :valid, :with_custom_pdf, account: account, incident: account.incidents.last)
  end

  desc "Drop and recreate DB, with seed data"
  task :recreate, [] => :environment do |t, args|
    db_name = Rails.configuration.database_configuration[Rails.env]["database"]
    Rake::Task["db:drop"].invoke
    Rake::Task["db:create"].invoke
    Rake::Task["db:migrate"].invoke
    Rake::Task["developers:seed"].invoke
  end

  desc "Parse tasks CSV"
  task :csv_to_json, [] => :environment do |t, args|
    # TODO: take an argument for the file name, append .csv or .json in appropriate place
    path = Rails.root.join("app/models/files/seed_files/")
    input = File.open(path + "ics_tasks.csv", "r")
    header, line = nil
    rows = []
    input.each_with_index do |row, i|
      if i == 0
        header = row.gsub("\n", '').split(';')
      else
        line = row.gsub("\n", '').split(';')
      end

      if line
        a = []
        line.each_with_index do |element, j|
          a << header[j]
          a << element
        end
        rows << Hash[*a]
      end
    end
    json = JSON.pretty_generate(rows)
    output = File.open(path + "ics_tasks.json", "w")
    output.write(json)
    input.close()
    output.close()
  end
end
