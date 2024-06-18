class Area < ApplicationRecord
  has_many :notes
  has_many :people
  has_many :areas
  has_many :tags, dependent: :destroy

  belongs_to :area, optional: true
  belongs_to :company, optional: true

  accepts_nested_attributes_for :tags, allow_destroy: true

  delegate :logo, to: :company, allow_nil: true

  ZOOM_MULTIPLICATOR = 23525234
  ZOOM_LEVEL = 1.0/8.00

  def update_max_zoom
    update(max_zoom: calculate_max_zoom)
  end

  def update_coordinate
    longitude, latitude = calculate_coordinate

    update(longitude: longitude, latitude: latitude)
  end

  def added_people_count
    @added_people_count ||= people.size + areas.sum(&:added_people_count)
  end

  def estimated_people_count
    @estimated_people_count ||= areas.sum { |area| area.people_count || 0 }
  end

  def logo_url
    logo&.url
  end

  def regenerate_color
    update(color: "#" + ["%x" % (100 + rand(155)), "%x" % (100 + rand(155)), "%x" % (100 + rand(155))].join)
  end

  private

  def calculate_max_zoom
    return 0 if longitudes.blank? || latitudes.blank?

    range_longitudes = longitudes.max - longitudes.min
    range_latitudes = latitudes.max - latitudes.min

    (ZOOM_MULTIPLICATOR / ([range_longitudes, range_latitudes].max))**(ZOOM_LEVEL)
  end

  def decimal_coordinates
    @decimal_coordinates ||= coordinates.map do |coordinate|
      coordinate.gsub(/[\[\]]/, '').split(',').map(&:to_d)
    end
  end

  def longitudes
    @longitudes ||= decimal_coordinates.map(&:first)
  end

  def latitudes
    @latitudes ||= decimal_coordinates.map(&:last)
  end

  def calculate_coordinate
    return [nil, nil] if longitudes.blank? || latitudes.blank?

    return [
      longitudes.min + (longitudes.max - longitudes.min) / 2,
      latitudes.min + (latitudes.max - latitudes.min) / 2
    ]
  end
end
