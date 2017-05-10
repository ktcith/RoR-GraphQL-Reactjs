class AddClassificationToIncident < ActiveRecord::Migration[5.0]
  def change
    add_column :incidents, :classification, :string
  end
end
