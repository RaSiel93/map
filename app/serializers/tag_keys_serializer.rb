class TagKeysSerializer
  include JSONAPI::Serializer

  attributes :id, :name, :label

  attribute :options do |tag_key|
    TagValueSerializer.new(tag_key.options).as_json["data"]
  end
end
