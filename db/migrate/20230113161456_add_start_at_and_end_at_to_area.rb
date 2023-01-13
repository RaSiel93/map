class AddStartAtAndEndAtToArea < ActiveRecord::Migration[6.1]
  def change
    add_column :areas, :start_at, :datetime
    add_column :areas, :end_at, :datetime
  end
end
