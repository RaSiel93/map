class CreatePeople < ActiveRecord::Migration[6.1]
  def change
    create_table :people do |t|
      t.string :first_name
      t.string :last_name
      t.string :middle_name
      t.references :father
      t.references :mother
      t.datetime :birth_at
      t.text :notice

      t.timestamps
    end
  end
end
