module Api
  module V1
    class CompaniesController < ApplicationController
      def index
        render json: Company.all
      end

      def create
        company = Company.create(company_params)

        render json: company
      end

      def destroy
        company = Company.find(params[:id])

        company.destroy

        render json: company
      end

      private

      def company_params
        @company_params ||= params.require(:company).permit(:name, :number, :notice, :area_id)
      end
    end
  end
end
