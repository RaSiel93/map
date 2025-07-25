class AreasImportService
  attr_reader :file, :parser

  OSM_FORMAT = "application/geo+json"
  KMZ_FORMAT = "application/vnd.google-earth.kml+xml"

  def initialize(file)
    @file = file

    @parser = case file.content_type
    when OSM_FORMAT
      OsmParser.new
    when KMZ_FORMAT
      KmlParser.new
    end
  end

  def call
    areas = parser.parse(file)

    Area.create(areas)
  end
end

class OsmParser
  MAX_DEEP_COORDINATE = 10

  def parse(file)
    data = JSON.parse(File.new(file).read)

    tag_keys = TagKey.pluck(:label).select { |a| a.present? }

    data['features'].flat_map do |feature|
      type = feature.dig('geometry', 'type')
      coordinates = feature.dig('geometry', 'coordinates')
      properties = feature['properties']

      next if type == 'Point'

      puts("TYPE: #{type}, coordinates: #{coordinates}")

      coordinates.map do |coordinate|
        counter = 0

        # puts("!coordinate #{coordinate}; type: #{type}")

        while (!coordinate[0][0].is_a?(Numeric) && counter < MAX_DEEP_COORDINATE) do
          coordinate = coordinate[0]
          counter += 1
        end

        tags_attributes = properties.map do |key, value|
          tag_key = TagKey.find_by(label: key)
          tag_value = (tag_key&.options || []).find { |option| option.name == value }

          next if tag_key.nil? || tag_value.nil?

          {
            tag_key_id: tag_key.id,
            tag_value_id: tag_value.id,
          }
        end.compact

        people_count = properties['population']

        {
          title: properties['local_name'] || properties['name'],
          coordinates: coordinate.map(&:to_json),
          description: properties,
          tags_attributes: tags_attributes,
          people_count: people_count,
        }
      end
    end.compact
  end
end

class KmlParser
  def parse(file)
    data = Nokogiri::XML(file)

    coordinates = data
      .xpath("//xmlns:coordinates")[0]
      .content[1..-1].gsub(' ', '')
      .split(",0\n")
      .map { |coordinate| "[#{coordinate}]"}

    [{
      title: data.xpath("//xmlns:description")[0]&.content&.gsub(/.+<br>/, ''),
      coordinates: coordinates,
      description: "KML exported"
    }]
  end
end
