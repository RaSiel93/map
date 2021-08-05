class Note < ApplicationRecord
  belongs_to :area, optional: true
end
