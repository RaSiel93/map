class CreateCars < ActiveRecord::Migration[6.1]
  def change
    create_table :cars do |t|
      t.string :number
      t.string :notice
      t.string :longitude
      t.string :latitude

      t.timestamps
    end
  end
end
