class CarSerializer
  include JSONAPI::Serializer
  attributes :id, :number, :notice, :longitude, :latitude
end
