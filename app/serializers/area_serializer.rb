class AreaSerializer
  include JSONAPI::Serializer
  attributes :id, :coordinates
end
