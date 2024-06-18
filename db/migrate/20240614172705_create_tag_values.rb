class CreateTagValues < ActiveRecord::Migration[6.1]
  def change
    create_table :tag_values do |t|
      t.string :name
      t.string :label
      t.references :tag_key, null: false, foreign_key: true

      t.timestamps
    end
  end
end
