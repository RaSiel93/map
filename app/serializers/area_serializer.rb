class AreaSerializer
  include JSONAPI::Serializer

  attributes :id, :title, :description, :coordinates

  attribute :notes do |area|
    NoteSerializer.new(area.notes).as_json["data"]
  end
end
