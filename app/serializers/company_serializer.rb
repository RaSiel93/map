class CompanySerializer < ActiveModel::Serializer
  attributes :id, :name, :number, :notice, :area_id
end
