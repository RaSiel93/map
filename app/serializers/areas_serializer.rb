class AreasSerializer
  include JSONAPI::Serializer

  attributes :id, :title, :description, :coordinates, :max_zoom, :area_id,
    :people_count, :logo_url, :longitude, :latitude
end