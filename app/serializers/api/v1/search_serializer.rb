module Api
  module V1
    class SearchSerializer < ActiveModel::Serializer
      attributes :id, :title, :description, :longitude, :latitude
    end
  end
end
