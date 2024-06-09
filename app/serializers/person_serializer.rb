class PersonSerializer
  include JSONAPI::Serializer

  attributes :id, :first_name, :last_name, :middle_name, :birth_at, :notice

  attribute :company do |person|
    CompanySerializer.new(person.company).as_json["data"]
  end
end
