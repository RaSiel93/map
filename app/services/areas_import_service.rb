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
    Area.create(parser.parse(file))
  end
end

class OsmParser
  MAX_DEEP_COORDINATE = 10

  def parse(file)
    data = JSON.parse(File.new(file).read)

    data['features'].flat_map do |feature|
      coordinates = feature.dig('geometry', 'coordinates')
      properties = feature['properties']

      coordinates.map do |coordinate|
        counter = 0

        while (!coordinate[0][0].is_a? Numeric || counter < MAX_DEEP_COORDINATE) do
          coordinate = coordinate[0]
          counter += 1
        end

        {
          title: properties['local_name'],
          coordinates: coordinate.map(&:to_json),
          description: properties
        }
      end
    end
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
