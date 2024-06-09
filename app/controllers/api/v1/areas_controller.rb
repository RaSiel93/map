module Api
  module V1
    class AreasController < ApplicationController
      def index
        date = params[:date] ? Time.new(params[:date]) : Time.zone.now
        zoom = params[:zoom] || 1
        startDate = params[:startDate] === "true"

        areas = Area.where(hidden: false)

        areas = if (startDate)
          areas.where("start_at is null OR start_at < ?", date)
        else
          areas.where("start_at < ?", date)
        end

        areas = areas
          .where("end_at is null OR end_at > ?", date)
          .where("max_zoom > ?", zoom)
          .includes(:company).includes(:tags)

        render json: AreasSerializer.new(areas).serializable_hash.to_json
      end

      def create
        date = params[:date] ? Time.new(params[:date]) : Time.zone.now
        area = Area.create(area_params.merge(start_at: date))

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
        date = params[:date] ? Time.new(params[:date]) : Time.zone.now

        if (area.start_at === nil || !area_params['coordinates'] || date.year === area.start_at.year)
          area.update(area_params)
        else
          area = Area.create(area_params.merge(
            title: area.title,
            start_at: date,
            color: area.color,
            tags_attributes: area.tags.map { |tag| tag.attributes.slice('key', 'value') }
          ))
        end

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
          :title, :description, :area_id, :company_id, :people_count, :start_at, :end_at, coordinates: []
        )
      end

      def serialize(records, options = {})
        AreaSerializer.new(records).serializable_hash.to_json
      end
    end
  end
end
