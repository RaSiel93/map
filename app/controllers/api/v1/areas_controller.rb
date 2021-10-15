module Api
  module V1
    class AreasController < ApplicationController
      def index
        render json: AreasSerializer.new(Area.where(hidden: false)).serializable_hash.to_json
      end

      def create
        area = Area.create(area_params)

        area.update_max_zoom

        render json: serialize(area)
      end

      def show
        area = Area.find(params[:id])

        render json: serialize(area)
      end

      def update
        area = Area.find(params[:id])

        area.update(area_params)

        area.update_max_zoom

        render json: serialize(area)
      end

      def destroy
        area = Area.find(params[:id])

        area.destroy

        render json: serialize(area)
      end

      private

      def area_params
        @area_params ||= params.require(:area).permit(
          :title, :description, :area_id, :people_count, coordinates: []
        )
      end

      def serialize(records, options = {})
        AreaSerializer.new(records).serializable_hash.to_json
      end
    end
  end
end
