class AddTagKeyAndTagValueToTag < ActiveRecord::Migration[6.1]
  def change
    add_reference :tags, :tag_key, null: false, foreign_key: true, default: 1
    add_reference :tags, :tag_value, null: false, foreign_key: true, default: 1
  end
end
