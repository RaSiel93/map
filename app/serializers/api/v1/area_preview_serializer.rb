module Api
  module V1
    class AreaPreviewSerializer < ActiveModel::Serializer
      attributes :id, :title
    end
  end
end
