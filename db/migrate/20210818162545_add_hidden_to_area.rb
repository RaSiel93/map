class AddHiddenToArea < ActiveRecord::Migration[6.1]
  def change
    add_column :areas, :hidden, :boolean, null: false, default: false
  end
end
