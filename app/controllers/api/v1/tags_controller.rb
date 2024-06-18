module Api
  module V1
    class TagsController < ApplicationController
      def index
        tags = TagKey.all

        render json: TagKeysSerializer.new(tags).serializable_hash.to_json
      end
    end
  end
end
