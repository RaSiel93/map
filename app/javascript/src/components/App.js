import React, { useRef, useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import DeckGL from '@deck.gl/react';
import {LineLayer} from '@deck.gl/layers';
import {StaticMap} from 'react-map-gl';
import { PathLayer, ScatterplotLayer } from "@deck.gl/layers";
import {TerrainLayer} from '@deck.gl/geo-layers';
import axios from 'axios'
import ReactModal from 'react-modal'
import styled from 'styled-components'
import { AddModal } from './AddModal'
import { EditModal } from './EditModal'
import { AddPersonButton } from './buttons/AddPersonButton'
import { AddAreaButton } from './buttons/AddAreaButton'

const Mode = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 10;
  height: 50px;
  background-color: #0005;
  font-size: 20px;
  color: #fff;
  width: 90vw;
`

const App = () => {
  const [data, setData] = useState([])
  const [areaData, setAreaData] = useState([])
  const [modalAddOpen, setModalAddOpen] = useState(false)
  const [modalEditOpen, setModalEditOpen] = useState(false)
  const [latitude, setLatitude] = useState(null)
  const [longitude, setLongitude] = useState(null)
  const [selected, setSelected] = useState(null)

  const [mode, setMode] = useState(null)

  const openAddModal = () => {
    setModalAddOpen(true)
  }

  const closeAddModal = () => {
    setModalAddOpen(false)
  }

  const openEditModal = () => {
    setModalEditOpen(true)
  }

  const closeEditModal = () => {
    setModalEditOpen(false)
  }

  const lineCoordinates = () => {
    let coordinates = []

    for (let i = 0; i < areaData.length - 1; i++) {
      coordinates.push({
        from: areaData[i], to: areaData[i + 1]
      })
    }

    return coordinates;
  }

  useEffect(() => {

    // setData([
    //   {

    //     number: 'fefe',
    //     notice: 'faefaewfawe',
    //     coordinates: [27.478700, 53.868718]
    //   },
    //   {
    //     number: 'fefe2',
    //     notice: 'faefaewfawe',
    //     coordinates: [27.478800, 53.868718]
    //   },
    //   {
    //     number: 'fefe3',
    //     notice: 'faefaewfawe',
    //     coordinates: [27.478900, 53.868718]
    //   },
    //   {
    //     number: 'fefe0',
    //     notice: 'faefaewfawe',
    //     coordinates: [27.479000, 53.868718]
    //   },
    //   {
    //     number: 'fefe5',
    //     notice: 'faefaewfawe',
    //     coordinates: [27.479100, 53.868718]
    //   },
    //   {
    //     number: 'fefe6',
    //     notice: 'faefaewfawe',
    //     coordinates: [27.479200, 53.868718]
    //   },
    // ])

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

      setData(cars)
    })
    .catch((response) => {
      console.log(response)
    })
  }, [])

  console.log(lineCoordinates())

  const layers = [
    new ScatterplotLayer({
      id: 'scatterplot-layer',
      data,
      pickable: true,
      opacity: 0.6,
      stroked: true,
      filled: true,
      radiusScale: 3,
      radiusMinPixels: 1,
      radiusMaxPixels: 20,
      lineWidthMinPixels: 1,
      getPosition: d => d.coordinates,
      getRadius: d => Math.sqrt(d.exits),
      getFillColor: d => [200, 200, 200],
      getLineColor: d => [0, 0, 0]
    }),
    new ScatterplotLayer({
      id: 'scatterplot-layer',
      data: areaData,
      pickable: true,
      opacity: 0.6,
      stroked: true,
      filled: true,
      radiusScale: 2,
      radiusMinPixels: 1,
      radiusMaxPixels: 20,
      lineWidthMinPixels: 1,
      getPosition: d => d.coordinates,
      getRadius: d => Math.sqrt(d.exits),
      getFillColor: d => [250, 250, 100],
      getLineColor: d => [0, 0, 0]
    }),
    new LineLayer({
      id: 'line-layer',
      data: lineCoordinates(),
      pickable: true,
      getWidth: 3,
      getSourcePosition: d => d.from.coordinates,
      getTargetPosition: d => d.to.coordinates,
      getColor: d => [250, 250, 100]
    })
  ]

  const onClick = (event) => {
    if (mode === 'area') {
      const [longitude, latitude] = event.coordinate

      setLatitude(latitude)
      setLongitude(longitude)

      setAreaData(areaData => [...areaData, {
        exits: 3,
        coordinates: [+longitude, +latitude]
      }])
    } else {
      const picked = event.object;

      if (picked) {
        setSelected(picked)

        openEditModal()
      } else {
        const [longitude, latitude] = event.coordinate

        setLatitude(latitude)
        setLongitude(longitude)

        openAddModal()
      }
    }
  }

  return (
    <div>
      {
        mode && <Mode>{mode}</Mode>
      }
      <AddModal
        isOpen={modalAddOpen}
        onRequestClose={closeAddModal}
        latitude={latitude}
        longitude={longitude}
        setData={setData}
        data={data}
      />
      {selected && <EditModal
        isOpen={modalEditOpen}
        onRequestClose={closeEditModal}
        item={selected}
        setData={setData}
        data={data}
      />}
      <DeckGL
        onClick={onClick}
        initialViewState={{
          longitude: 27.478700,
          latitude: 53.868718,
          zoom: 16.0,
          minZoom: 15,
          maxZoom: 25,
          pitch: 0,
          bearing: 0
        }}
        height="100%"
        width="100%"
        zIndex="5"
        controller={true}
        layers={layers}
        getTooltip={({object}) => object && `${object.number}\n${object.notice}`}
        style={{zIndex: '1'}}
      >
        <StaticMap
          mapStyle="mapbox://styles/mapbox/satellite-v9"
          mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
        />
      </DeckGL>
      <AddAreaButton mode={mode} setMode={setMode}/>
      <AddPersonButton/>
    </div>
  )
}

export default App;

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
