class PersonSerializer
  include JSONAPI::Serializer

  attributes :first_name, :last_name, :middle_name, :birth_at, :notice
end
