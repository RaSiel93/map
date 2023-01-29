class CreateTags < ActiveRecord::Migration[6.1]
  def change
    create_table :tags do |t|
      t.string :key
      t.string :value
      t.references :area

      t.timestamps
    end
  end
end
