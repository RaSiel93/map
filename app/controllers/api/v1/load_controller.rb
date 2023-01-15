module Api
  module V1
    class LoadController < ApplicationController
      MAX_DEEP_COORDINATE = 10

      def create
        file = JSON.parse(params[:file])

        file['features'].each do |feature|
          coordinates = feature.dig('geometry', 'coordinates')
          properties = feature['properties']

          coordinates.each do |coordinate|
            counter = 0

            while (!coordinate[0][0].is_a? Numeric || counter < MAX_DEEP_COORDINATE) do
              coordinate = coordinate[0]
              counter += 1
            end

            area = Area.create(
              title: properties['local_name'],
              coordinates: coordinate.map(&:to_json),
              description: properties
            )

            area.update_max_zoom
            area.update_coordinate
          end
        end
      end
    end
  end
end
