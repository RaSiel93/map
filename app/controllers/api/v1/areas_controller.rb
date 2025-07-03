module Api
  module V1
    class AreasController < ApplicationController
      def index
        date = params[:date].present? ? Time.zone.parse(params[:date]) : Time.zone.now
        zoom = params[:zoom].to_f || 1
        longitude = params[:longitude]
        latitude = params[:latitude]
        start_date = params[:startDate] === "true"
        tags = (params[:tags] || []).map { |tag| JSON.parse(tag) }

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
          # .includes(:company)
          # .includes(tags: [:key, :value])
          .includes(:tags)

        if (longitude.present? && latitude.present? && zoom.present?)
          areas = areas.where(
            "ST_DWithin(location, ST_SetSRID(ST_MakePoint(?, ?), 4326)::geography, ?)",
            longitude, latitude, tile_radius_for_zoom(zoom)
          )
        end

        if tags.present?
          areas = tags.reduce(nil) do |acc, (tag)|
            condition = areas.where(tags: { tag_value_id: tag.dig('id') })
            acc ? acc.or(condition) : condition
          end
        end

        cached_areas = render_to_string json: areas, include: %w[], fields: %i[id title area_id longitude latitude color coordinates tag_value_ids]

        response.headers['Content-Length'] = cached_areas.bytesize.to_s

        render body: cached_areas, content_type: 'application/json'
      end

      def create
        date = params[:date].present? ? params[:date] : nil
        area = Area.new(area_params.merge(start_at: date))

        area.set_max_zoom
        area.set_coordinate

        if area.save
          render json: area, include: %w[tags.key tags.value]
        else
          render json: { errors: area.errors }, status: :unprocessable_entity
        end
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
          area.assign_attributes(area_params)
        else
          area = Area.create(area_params.merge(
            title: area.title,
            description: area.description,
            start_at: date,
            color: area.color,
            tags_attributes: area.tags.map { |tag| tag.attributes.slice('tag_key_id', 'tag_value_id') }
          ))
        end

        area.set_max_zoom
        area.set_coordinate

        if area.save
          render json: area, include: %w[tags.key tags.value]
        else
          render json: { errors: area.errors }, status: :unprocessable_entity
        end
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

      def tile_radius_for_zoom(zoom)
        earth_circumference = 40_075_016.686 # м
        tile_size = 256.0
        resolution_m_per_px = earth_circumference / tile_size / (2 ** zoom)
        visible_tile_count = 3 # або 2–4 у залежнасці ад буфера

        radius_m = resolution_m_per_px * tile_size * visible_tile_count / 2
        radius_m.round(2)
      end
    end
  end
end
