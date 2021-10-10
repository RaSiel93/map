export function carToScatterplotObject(car) {
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
    id, title, description, coordinates, notes, max_zoom, area_id, people,
    people_count, added_people_count, estimated_people_count, areas,
  } = area.attributes;

  return {
    id: id,
    index: id,
    number: title,
    notice: description,
    contour: coordinates.map(coordinate => JSON.parse(coordinate)),
    notes: notes,
    maxZoom: max_zoom,
    areaId: area_id,
    people: people,
    areas: areas,
    peopleCount: people_count,
    addedPeopleCount: added_people_count,
    estimatedPeopleCount: estimated_people_count,
  }
}
