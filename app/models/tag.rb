class Tag < ApplicationRecord
  belongs_to :key, foreign_key: 'tag_key_id', class_name: 'TagKey'
  belongs_to :value, foreign_key: 'tag_value_id', class_name: 'TagValue'
  belongs_to :area

  accepts_nested_attributes_for :key
  accepts_nested_attributes_for :value
end
