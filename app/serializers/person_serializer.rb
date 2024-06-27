class PersonSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :middle_name, :birth_at, :notice

  belongs_to :company
end
