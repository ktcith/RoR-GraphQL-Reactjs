class CreateResourceCategories < ActiveRecord::Migration[5.0]
  def change
    create_table :resource_categories do |t|
      t.references :account, foreign_key: true
      t.string :name
      t.text :description

      t.timestamps
    end
  end
end
