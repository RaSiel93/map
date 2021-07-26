module Api
  module V1
    class AreasController < ApplicationController
      def index
        render json: serialize(Area.includes(:people))
      end

      def create
        area = Area.create(area_params)

        render json: serialize(area)
      end

      def update
        area = Area.find(params[:id])

        area.update(area_params)

        render json: serialize(area)
      end

      def destroy
        area = Area.find(params[:id])

        area.destroy

        render json: serialize(area)
      end

      private

      def area_params
        @area_params ||= params.require(:area).permit(:title, :description, coordinates: [])
      end

      def serialize(records, options = {})
        AreaSerializer.new(records).serializable_hash.to_json
      end
    end
  end
end
