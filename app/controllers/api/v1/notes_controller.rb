module Api
  module V1
    class NotesController < ApplicationController
      def index
        render json: serialize(Note.all)
      end

      def create
        note = Note.create(note_params)

        render json: serialize(note)
      end

      def destroy
        note = Note.find(params[:id])

        note.destroy

        render json: serialize(note)
      end

      private

      def note_params
        @note_params ||= params.require(:note).permit(:text, :area_id)
      end

      def serialize(records, options = {})
        NoteSerializer.new(records, options).serializable_hash.to_json
      end
    end
  end
end
