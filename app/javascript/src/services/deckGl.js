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
  const { id, coordinates } = area.attributes;

  return {
    id: id,
    contour: coordinates.map(coordinate => JSON.parse(coordinate))
  }
}
