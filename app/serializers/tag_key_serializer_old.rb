class TagKeySerializer
  include JSONAPI::Serializer

  attributes :id, :name, :label
end
