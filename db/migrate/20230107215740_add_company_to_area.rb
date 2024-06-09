class AddCompanyToArea < ActiveRecord::Migration[6.1]
  def change
    add_reference :areas, :company, foreign_key: true
  end
end
