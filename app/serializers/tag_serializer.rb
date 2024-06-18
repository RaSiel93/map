class TagSerializer
  include JSONAPI::Serializer

  attributes :id, :area_id

  attribute :key do |tag|
    TagKeySerializer.new(tag.key).as_json["data"]
  end

  attribute :value do |tag|
    TagValueSerializer.new(tag.value).as_json["data"]
  end
end
