class AddCoordinateToArea < ActiveRecord::Migration[6.1]
  def change
    add_column :areas, :longitude, :decimal
    add_column :areas, :latitude, :decimal
  end
end
