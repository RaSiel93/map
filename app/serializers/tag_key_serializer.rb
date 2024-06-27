class TagKeySerializer < ActiveModel::Serializer
  attributes :id, :name, :label

  has_many :options, class_name: 'TagValue'
end
