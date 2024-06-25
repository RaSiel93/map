module Api
  module V1
    class TagSerializer < ActiveModel::Serializer
      # include JSONAPI::Serializer

      # attributes :id, :area_id

      has_one :key
      belongs_to :key

      # belongs_to :tag_key, class_name: 'TagKey'
      # belongs_to :value, class_name: 'TagValue'
      # has_many :tags

      # attribute :tags do |area|
      #   TagSerializer.new(area.tags).as_json["data"]
      # end

      # attribute :coordinates do |area|
      #   area.coordinates.map { |coordinate| JSON.parse(coordinate) }
      # end
    end
  end
end
