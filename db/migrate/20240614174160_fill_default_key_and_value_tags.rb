class FillDefaultKeyAndValueTags < ActiveRecord::Migration[6.1]
  def up
    TagKey.find_or_create_by(id: 0)
    TagValue.find_or_create_by(id: 0)
  end
end
