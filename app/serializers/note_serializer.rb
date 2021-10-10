class NoteSerializer
  include JSONAPI::Serializer

  attributes :id, :text
end
