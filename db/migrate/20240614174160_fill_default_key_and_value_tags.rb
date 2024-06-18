class FillDefaultKeyAndValueTags < ActiveRecord::Migration[6.1]
  def up
    tag_key = TagKey.find_or_create_by(id: 0)
    TagValue.find_or_create_by(id: 0, tag_key: tag_key)
  end
end
