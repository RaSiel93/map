module Api
  module V1
    class CompaniesController < ApplicationController
      def index
        render json: serialize(Company.all)
      end

      def create
        company = Company.create(company_params)

        render json: serialize(company)
      end

      def destroy
        company = Company.find(params[:id])

        company.destroy

        render json: serialize(company)
      end

      private

      def company_params
        @company_params ||= params.require(:company).permit(
          :name, :number, :notice, :area_id
        )
      end

      def serialize(records, options = {})
        CompanySerializer.new(records, options).serializable_hash.to_json
      end
    end
  end
end
