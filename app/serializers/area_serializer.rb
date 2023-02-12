class AreaSerializer
  include JSONAPI::Serializer

  attributes :id, :title, :description, :max_zoom, :area_id,
    :people_count, :added_people_count, :estimated_people_count, :company_id,
    :logo_url, :longitude, :latitude, :start_at, :end_at, :color

  attribute :notes do |area|
    NoteSerializer.new(area.notes).as_json["data"]
  end

  attribute :people do |area|
    PersonSerializer.new(area.people).as_json["data"]
  end

  attribute :areas do |area|
    AreasSerializer.new(area.areas.order('title')).as_json["data"]
  end

  attribute :tags do |area|
    TagSerializer.new(area.tags).as_json["data"]
  end

  attribute :coordinates do |area|
    area.coordinates.map { |coordinate| JSON.parse(coordinate) }
  end

  attribute :parent do |area|
    area = area&.area

    area && {
      id: area&.id,
      type: 'area',
      attributes: {
        id: area&.id,
        title: area&.title
      }
    }
  end
end
