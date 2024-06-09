class AddMaxZoomToArea < ActiveRecord::Migration[6.1]
  def change
    add_column :areas, :max_zoom, :decimal, null: false, default: 100
  end
end
