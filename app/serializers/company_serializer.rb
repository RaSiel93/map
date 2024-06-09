class CompanySerializer
  include JSONAPI::Serializer

  attributes :name, :number, :notice, :area_id
end
