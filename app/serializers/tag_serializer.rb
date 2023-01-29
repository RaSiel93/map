class TagSerializer
  include JSONAPI::Serializer

  attributes :id, :key, :value
end
