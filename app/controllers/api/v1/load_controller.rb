module Api
  module V1
    class LoadController < ApplicationController
      def create
        areas = AreasImportService.new(params[:file]).call

        # areas.each do |area|
        #   area.update_max_zoom
        #   area.update_coordinate
        # end
      end
    end
  end
end
