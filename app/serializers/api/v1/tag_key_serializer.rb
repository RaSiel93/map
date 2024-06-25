module Api
  module V1
    class TagKeySerializer < ActiveModel::Serializer
      attributes :id, :name, :label

      # has_many :tags
    end
  end
end
