class AddAreaToPerson < ActiveRecord::Migration[6.1]
  def change
    add_reference :people, :area
  end
end
