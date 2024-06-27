module Api
  module V1
    class TagSerializer < ActiveModel::Serializer
      attributes :id, :area_id

      belongs_to :key
      belongs_to :value
    end
  end
end
