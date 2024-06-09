class CreateCompanies < ActiveRecord::Migration[6.1]
  def change
    create_table :companies do |t|
      t.string :name
      t.string :number
      t.text :notice
      t.references :area

      t.timestamps
    end
  end
end
