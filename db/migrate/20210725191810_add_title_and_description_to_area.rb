class AddTitleAndDescriptionToArea < ActiveRecord::Migration[6.1]
  def change
    add_column :areas, :title, :string
    add_column :areas, :description, :string
  end
end
