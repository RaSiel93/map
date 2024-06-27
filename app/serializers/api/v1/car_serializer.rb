module Api
  module V1
    class CarSerializer < ActiveModel::Serializer
      attributes :id, :number, :notice, :longitude, :latitude
    end
  end
end
