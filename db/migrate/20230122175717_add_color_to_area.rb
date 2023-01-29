class AddColorToArea < ActiveRecord::Migration[6.1]
  def change
    add_column :areas, :color, :string
  end
end
