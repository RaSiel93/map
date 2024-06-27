class AreasSerializer
  include JSONAPI::Serializer

  attributes :id, :title, :description, :max_zoom, :area_id,
    :people_count, :logo_url, :longitude, :latitude, :start_at, :end_at, :color

  attribute :tags do |area|
    TagSerializer.new(area.tags).as_json["data"]
  end

  attribute :coordinates do |area|
    area.coordinates.map { |coordinate| JSON.parse(coordinate) }
  end
end
