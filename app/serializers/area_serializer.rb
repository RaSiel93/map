class AreaSerializer
  include JSONAPI::Serializer

  attributes :id, :title, :description, :coordinates

  attribute :people do |area|
    PersonSerializer.new(area.people).as_json["data"]
  end
end
