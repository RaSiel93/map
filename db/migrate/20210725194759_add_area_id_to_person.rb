class AddAreaIdToPerson < ActiveRecord::Migration[6.1]
  def change
    add_reference :people, :area, foreign_key: true
  end
end
