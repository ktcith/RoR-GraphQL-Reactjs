class AddCreatedByToIncident < ActiveRecord::Migration[5.0]
  def change
    remove_column :incidents, :created_by_id
    add_reference :incidents, :created_by, references: :users, index: true
    add_foreign_key :incidents, :users, column: :created_by_id
  end
end
