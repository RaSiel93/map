module Api
  module V1
    class AreasController < ApplicationController
      def index
        date = params[:date].present? ? Time.zone.parse(params[:date]) : Time.zone.now
        zoom = params[:zoom] || 1
        start_date = params[:startDate] === "true"

        # cached_areas = Rails.cache.fetch("test-#{date.year}") do
        areas = Area.where(hidden: false)

        areas = if (start_date)
          areas.where("start_at is null OR start_at <= ?", date)
        else
          areas.where("start_at <= ?", date)
        end

        areas = areas
          .where("end_at is null OR end_at > ?", date)
          .where("max_zoom > ?", zoom)
          .includes(:company).includes(tags: [:key, :value])

        cached_areas = render_to_string json: areas, include: %w[tags.key tags.value], fields: %i[id title description max_zoom area_id people_count logo_url longitude latitude start_at end_at color coordinates]
        # end

        render json: cached_areas
      end

      def create
        date = params[:date].present? ? params[:date] : nil
        area = Area.create(area_params.merge(start_at: date))

        area.update_max_zoom
        area.update_coordinate

        render json: area, include: %w[tags.key tags.value]
      end

      def show
        area = Area.includes(people: :company).find(params[:id])

        # render json: area, include: %w[tags.key tags.value people.company area], fields: %i[id title description max_zoom area_id
        #   people_count logo_url longitude latitude start_at end_at color notes areas]

        render json: area, include: %w[tags.key tags.value people.company parent]
      end

      def update
        area = Area.find(params[:id])
        date = params[:date] ? params[:date] : Time.zone.now

        if (area.start_at === nil || !area_params['coordinates'] || date.year === area.start_at.year)
          area.update(area_params)
        else
          area = Area.create(area_params.merge(
            title: area.title,
            description: area.description,
            start_at: date,
            color: area.color,
            tags_attributes: area.tags.map { |tag| tag.attributes.slice('tag_key_id', 'tag_value_id') }
          ))
        end

        area.update_max_zoom
        area.update_coordinate

        render json: area, include: %w[tags.key tags.value]
      end

      def destroy
        area = Area.find(params[:id])

        area.destroy

        render json: area
      end

      private

      def area_params
        @area_params ||= params.require(:area).permit(
          :title, :description, :area_id, :company_id, :people_count, :start_at, :end_at, :tag_ids,
          coordinates: [],
          tags_attributes: [:id, :area_id, :tag_key_id, :tag_value_id, :_destroy]
        )
      end
    end
  end
end
