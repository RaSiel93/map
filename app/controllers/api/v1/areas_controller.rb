module Api
  module V1
    class AreasController < ApplicationController
      def index
        date = params[:date] ? Time.new(params[:date]) : Time.zone.now

        areas = Area.where(hidden: false)
          .where("start_at is null OR start_at < ?", date)
          .where("end_at is null OR end_at > ?", date)
          .includes(:company)

        render json: AreasSerializer.new(areas).serializable_hash.to_json
      end

      def create
        area = Area.create(area_params)

        area.update_max_zoom
        area.update_coordinate

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
        area.update_coordinate

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
          :title, :description, :area_id, :company_id, :people_count, coordinates: []
        )
      end

      def serialize(records, options = {})
        AreaSerializer.new(records).serializable_hash.to_json
      end
    end
  end
end
