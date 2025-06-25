class AddLocationToAreas < ActiveRecord::Migration[6.1]
  def change
    add_column :areas, :location, :geography, geographic: true, has_z: false

    reversible do |dir|
      dir.up do
        execute <<~SQL
          UPDATE areas
          SET location = ST_SetSRID(ST_MakePoint(longitude, latitude), 4326)
        SQL
      end
    end
  end
end
