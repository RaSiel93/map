class CreateTagKeys < ActiveRecord::Migration[6.1]
  def change
    create_table :tag_keys do |t|
      t.string :name
      t.string :label

      t.timestamps
    end
  end
end
