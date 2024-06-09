class AddLogoToCompany < ActiveRecord::Migration[6.1]
  def change
    add_column :companies, :logo_uid, :string
    add_column :companies, :logo_name, :string
  end
end
