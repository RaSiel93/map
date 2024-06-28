module Api
  module V1
    class SearchSerializer < ActiveModel::Serializer
      attributes :longitude, :latitude
    end
  end
end
