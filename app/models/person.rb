class Person < ApplicationRecord
  belongs_to :mother, class_name: 'Person', optional: true
  belongs_to :father, class_name: 'Person', optional: true

  belongs_to :area, optional: true
  belongs_to :company, optional: true
end
