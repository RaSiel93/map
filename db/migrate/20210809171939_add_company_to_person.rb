class AddCompanyToPerson < ActiveRecord::Migration[6.1]
  def change
    add_reference :people, :company
  end
end
