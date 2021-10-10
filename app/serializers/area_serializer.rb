class AreaSerializer
  include JSONAPI::Serializer

  attributes :id, :title, :description, :coordinates, :max_zoom, :area_id,
    :people_count, :added_people_count, :estimated_people_count

  attribute :notes do |area|
    NoteSerializer.new(area.notes).as_json["data"]
  end

  attribute :people do |area|
    PersonSerializer.new(area.people).as_json["data"]
  end

  attribute :areas do |area|
    AreaSerializer.new(area.areas).as_json["data"]
  end
end
