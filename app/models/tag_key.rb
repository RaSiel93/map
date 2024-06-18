class TagKey < ApplicationRecord
  has_many :options, foreign_key: 'tag_key_id', class_name: 'TagValue'
end
