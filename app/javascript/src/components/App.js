import React, { useRef, useState, useEffect, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import axios from 'axios'
import './App.css'


const App = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    axios.get('api/v1/cars.json')
    .then((response) => {
      const cars = response.data.data.map((car) => {
        let { id, number, notice, longitude, latitude } = car.attributes

        return {
          id: id,
          index: id,
          number: number,
          notice: notice,
          exits: 3,
          coordinates: [+longitude, +latitude]
        }
      })

      console.log(cars)

      setData(cars)
    })
    .catch((response) => {
      console.log(response)
    })
  }, [])

  return (
    <MapContainer center={[53.868718, 27.478700]} zoom={16} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {data.map((car) => {
        return (<Marker position={[53.868718, 27.478700]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>)
      })}
    </MapContainer>
  )
}

export default App;
