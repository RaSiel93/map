module Api
  module V1
    class TagKeysController < ApplicationController
      def index
        render json: TagKey.includes(:options), include: 'options'
      end
    end
  end
end
