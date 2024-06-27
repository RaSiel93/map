class TagValueSerializer
  include JSONAPI::Serializer

  attributes :id, :name, :label
end
