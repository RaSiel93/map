module Api
  module V1
    class NotesController < ApplicationController
      def index
        render json: Note.all
      end

      def create
        note = Note.create(note_params)

        render json: note
      end

      def destroy
        note = Note.find(params[:id])

        note.destroy

        render json: note
      end

      private

      def note_params
        @note_params ||= params.require(:note).permit(:text, :area_id)
      end
    end
  end
end
