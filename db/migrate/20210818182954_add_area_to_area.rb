class AddAreaToArea < ActiveRecord::Migration[6.1]
  def change
    add_reference :areas, :area
  end
end
