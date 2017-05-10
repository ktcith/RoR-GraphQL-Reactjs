class RenameClassificationToIncidentClassification < ActiveRecord::Migration[5.0]
  def change
    rename_column :incidents, :classification, :incident_classification
  end
end
