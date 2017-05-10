class CreateIncidentUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :incident_users do |t|
      t.references :user, foreign_key: true
      t.references :incident, foreign_key: true
      t.string :role

      t.timestamps
    end
  end
end
