module Api
  module V1
    class SearchController < ApplicationController
      def index
        q = params[:q]
        date = params[:date].present? ? Time.zone.parse(params[:date]) : Time.zone.now
        zoom = params[:zoom].to_f || 1
        longitude = params[:longitude]
        latitude = params[:latitude]
        start_date = params[:startDate] === "true"
        tags = (params[:tags] || []).map { |tag| JSON.parse(tag) }

        areas = Area.where(hidden: false)

        areas = if (start_date)
          areas.where("start_at is null OR start_at <= ?", date)
        else
          areas.where("start_at <= ?", date)
        end

        areas = if q.present?
          ids = areas.left_joins(:company, tags: [:key, :value])
            .where("concat_ws(' ', areas.title, areas.description, companies.name, tag_keys.name, tag_values.name) ILIKE ?", "%#{q}%")
            .where("start_at is null OR start_at <= ?", date)
            .where("end_at is null OR end_at > ?", date).pluck(:id)

          Area.where(id: ids).order(:title, :description).includes(:tags)
        else
          []
        end

        if (longitude.present? && latitude.present? && zoom.present?)
          areas = areas.where(
            "ST_DWithin(location, ST_SetSRID(ST_MakePoint(?, ?), 4326)::geography, ?)",
            longitude, latitude, tile_radius_for_zoom(zoom)
          )
        end

        puts("tags: #{tags}")

        if tags.present?
          areas = tags.reduce(nil) do |acc, (tag)|
            condition = areas.where(tags: { tag_value_id: tag.dig('id') })
            acc ? acc.or(condition) : condition
          end
        end

        render json: areas, each_serializer: SearchSerializer
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
