module Api
  module V1
    class NoteSerializer < ActiveModel::Serializer
      attributes :id, :text
    end
  end
end
