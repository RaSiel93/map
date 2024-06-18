class RenameKeyValueForTags < ActiveRecord::Migration[6.1]
  def up
    rename_column :tags, :key, :draft_key
    rename_column :tags, :value, :draft_value
  end

  def down
    rename_column :tags, :draft_key, :key
    rename_column :tags, :draft_value, :value
  end
end
