class CreateIncidents < ActiveRecord::Migration[5.0]
  def change
    create_table :incidents do |t|
      t.references :account, foreign_key: true, null: false
      t.string :name, null: false
      t.date :started_on
      t.date :ended_on
      t.string :city
      t.string :state
      t.text :description
      t.string :status
      t.integer :operational_period_hours
      t.string :incident_type, null: false, default: 'incident'
      t.string :time_zone, null: false
      t.integer :created_by_id
      t.boolean :archived, null: false, default: false
      t.float :lat
      t.float :lng

      t.timestamps
    end
  end
end
