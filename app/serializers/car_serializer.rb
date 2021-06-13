class CarSerializer
  include JSONAPI::Serializer
  attributes :number, :notice, :longitude, :latitude
end
