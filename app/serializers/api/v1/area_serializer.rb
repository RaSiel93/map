module Api
  module V1
    class AreaSerializer < ActiveModel::Serializer
      attributes :id, :title, :description, :max_zoom, :area_id,
        :people_count, :logo_url, :longitude, :latitude, :start_at, :end_at, :color, :coordinates,
        :notes, :areas, :company_id, :added_people_count, :estimated_people_count

      has_many :tags
      has_many :people
      belongs_to :area, key: :parent, serializer: AreaPreviewSerializer

      def coordinates
        JSON.parse("[#{object.coordinates.join(',')}]")
      end
    end
  end
end
