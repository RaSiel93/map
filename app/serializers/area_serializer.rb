class AreaSerializer
  include JSONAPI::Serializer
  attributes :id, :title, :description, :coordinates
end
