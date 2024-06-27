module Api
  module V1
    class CompanySerializer < ActiveModel::Serializer
      attributes :id, :name, :number, :notice, :area_id
    end
  end
end
