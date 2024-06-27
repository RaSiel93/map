module Api
  module V1
    class CarsController < ApplicationController
      def index
        render json: Car.all
      end

      def create
        car = Car.create(car_params)

        render json: car
      end

      def update
        car = Car.find(params[:id])

        car.update(car_params)

        render json: car
      end

      def destroy
        car = Car.find(params[:id])

        car.destroy

        render json: car
      end

      private

      def car_params
        @car_params ||= params.require(:car).permit(:number, :latitude, :longitude, :notice)
      end
    end
  end
end
