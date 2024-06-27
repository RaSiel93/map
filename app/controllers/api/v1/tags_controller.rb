module Api
  module V1
    class TagsController < ApplicationController
      def index
        tags = Tag.includes(:key, :value)

        render json: tags
      end
    end
  end
end
