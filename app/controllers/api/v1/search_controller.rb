module Api
  module V1
    class SearchController < ApplicationController
      def index
        date = params[:date].present? ? Time.new(params[:date]) : Time.zone.now

        areas = if params[:q].present?
          Area.where(hidden: false).left_joins(:company, tags: [:key, :value])
            .where("concat_ws(' ', areas.title, areas.description, companies.name, tag_keys.name, tag_values.name) ILIKE ?", "%#{params[:q]}%")
            .where("start_at is null OR start_at <= ?", date)
            .where("end_at is null OR end_at > ?", date)
        else
          []
        end

        render json: areas, each_serializer: SearchSerializer
      end
    end
  end
end
