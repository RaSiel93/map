class Company < ApplicationRecord
  extend Dragonfly::Model

  dragonfly_accessor :logo do
    after_assign :resize_logo
  end

  has_many :areas
  has_many :people

  private

  def resize_logo
    logo.process!(:thumb, '100x100')
  end
end
