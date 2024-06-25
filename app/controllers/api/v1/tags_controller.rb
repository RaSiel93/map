module Api
  module V1
    class TagsController < ApplicationController
      def index
        tags = TagKey.includes(:options)

        render json: TagKeysSerializer.new(tags).serializable_hash.to_json
      end
    end
  end
end
