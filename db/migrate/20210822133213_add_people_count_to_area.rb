class AddPeopleCountToArea < ActiveRecord::Migration[6.1]
  def change
    add_column :areas, :people_count, :integer
  end
end
