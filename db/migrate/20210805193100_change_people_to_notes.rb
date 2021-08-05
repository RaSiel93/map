class ChangePeopleToNotes < ActiveRecord::Migration[6.1]
  def change
    rename_table :people, :notes
  end
end
