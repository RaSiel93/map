class AreaSerializer
  include JSONAPI::Serializer

  attributes :id, :title, :description, :coordinates, :max_zoom, :area_id, :people_count

  attribute :notes do |area|
    NoteSerializer.new(area.notes).as_json["data"]
  end
end
