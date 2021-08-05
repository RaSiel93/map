class RenameNoticeToTextForNotes < ActiveRecord::Migration[6.1]
  def change
    rename_column :notes, :notice, :text
  end
end
