module Api
  module V1
    class CarsController < ApplicationController
      def index
        render json: serialize(Car.all)
      end

      def create
        car = Car.create(car_params)

        render json: serialize(car)
      end

      private

      def car_params
        @car_params ||= params.require(:car).permit(
          :number, :latitude, :longitude, :notice
        )
      end

      def serialize(records, options = {})
        CarSerializer.new(records, options).serializable_hash.to_json
      end
    end
  end
end
