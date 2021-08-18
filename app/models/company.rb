class Company < ApplicationRecord
  belongs_to :area, optional: true

  has_many :people
end
