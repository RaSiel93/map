module Api
  module V1
    class PeopleController < ApplicationController
      def index
        render json: serialize(Person.includes(:company, :area))
      end

      def create
        person = Person.create(person_params)

        render json: serialize(person)
      end

      def destroy
        person = Person.find(params[:id])

        person.destroy

        render json: serialize(person)
      end

      private

      def person_params
        @person_params ||= params.require(:person).permit(
          :first_name, :last_name, :middle_name, :birth_at,
          :notice, :area_id, :company_id
        )
      end

      def serialize(records, options = {})
        PersonSerializer.new(records, options).serializable_hash.to_json
      end
    end
  end
end
