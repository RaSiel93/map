module Api
  module V1
    class SearchSerializer < ActiveModel::Serializer
      attributes :id, :description, :longitude, :latitude
    end
  end
end
