class RemoveDefaultsForTagKeyAndValue < ActiveRecord::Migration[6.1]
  def change
    change_column_default :tags, :tag_key_id, nil
    change_column_default :tags, :tag_value_id, nil
  end
end
