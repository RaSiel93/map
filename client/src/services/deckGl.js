export function pointToScatterplotObject(car) {
  const { id, number, notice, longitude, latitude } = car.attributes;

  return {
    id: id,
    index: id,
    number: number,
    notice: notice,
    exits: 3,
    coordinates: [+longitude, +latitude]
  }
}

export function areaToPolygonObject(area) {
  const {
    attributes: {
      id, title, description, coordinates, notes, max_zoom, area_id, people,
      people_count, added_people_count, estimated_people_count, areas, logo_url,
      longitude, latitude, start_at, end_at, color, tags
    }
  } = area;

  return {
    id: id,
    index: id,
    number: title,
    notice: description,
    contour: coordinates,
    notes: notes,
    maxZoom: max_zoom,
    areaId: area_id,
    people: people,
    areas: areas,
    peopleCount: people_count,
    addedPeopleCount: added_people_count,
    estimatedPeopleCount: estimated_people_count,
    logoUrl: logo_url,
    longitude: longitude,
    latitude: latitude,
    startAt: start_at,
    endAt: end_at,
    color: color,
    tags: tags
  }
}
