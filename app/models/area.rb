class Area < ApplicationRecord
  has_many :notes

  ZOOM_MULTIPLICATOR = 5848045528
  ZOOM_LEVEL = 1.0/10

  def update_max_zoom
    update(max_zoom: calculate_max_zoom)
  end

  def calculate_max_zoom
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
end
