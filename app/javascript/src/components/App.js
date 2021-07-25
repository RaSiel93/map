import React, { useRef, useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import ReactModal from 'react-modal';
import DeckGL from '@deck.gl/react';
import { PathLayer, ScatterplotLayer, LineLayer, PolygonLayer } from '@deck.gl/layers';
import { StaticMap } from 'react-map-gl';
import { TerrainLayer } from '@deck.gl/geo-layers';
import axios from 'axios';
import styled from 'styled-components';

import { AddCarModal } from './modals/AddCarModal';
import { EditCarModal } from './modals/EditCarModal';

import { AddPersonButton } from './buttons/AddPersonButton'
import { AddAreaButton } from './buttons/AddAreaButton'

import { getCars, createCar, updateCar, removeCar } from '../api/car';
import { getAreas } from '../api/area';
import { carToScatterplotObject, areaToPolygonObject } from '../services/deckGl';

const Mode = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  height: 50px;
  background-color: #0005;
  font-size: 20px;
  color: #fff;
  width: 100vw;
`

const App = () => {
  const [cars, setCars] = useState([]);
  const [areas, setAreas] = useState([]);
  const [areaData, setAreaData] = useState([]);
  const [modalAddOpen, setModalAddOpen] = useState(false);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [selected, setSelected] = useState(null);
  const [hoveredArea, setHoveredArea] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null);

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

  const lineCountours = () => {
    return [{ contour:
      areaData.map(data => data.coordinates)
    }]
  }

  const loadCars = async () => {
    const cars = await getCars();
    const deckGlCars = cars.map(carToScatterplotObject);

    setCars(deckGlCars);
  }

  const loadAreas = async () => {
    const areas = await getAreas();
    const deckGlAreas = areas.map(areaToPolygonObject);

    setAreas(deckGlAreas);
  }

  useEffect(() => {
    loadCars();
    loadAreas();
  }, [])

  const addCar = async (form) => {
    const token = document.querySelector('[name=csrf-token]').content;
    const params = { car: { latitude, longitude, ...form }};
    const car = await createCar(params, token);
    const deckGlCar = carToScatterplotObject(car);

    setCars([...cars, deckGlCar]);
    closeAddModal();
  }

  const editCar = async ({ id, ...form }) => {
    const token = document.querySelector('[name=csrf-token]').content;
    const params = { car: { ...form }};
    const car = await updateCar(id, params, token);
    const deckGlCar = carToScatterplotObject(car);

    setCars([...cars.filter((car) => { return car.id !== id }), deckGlCar]);
    closeEditModal();
  }

  const deleteCar = async ({ id }) => {
    const token = document.querySelector('[name=csrf-token]').content;
    await removeCar(id, token);

    setCars(cars.filter((car) => { return car.id !== id }));
    closeEditModal();
  }

  const layers = [
    new ScatterplotLayer({
      id: 'scatterplot-layer',
      data: cars,
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
      getLineColor: d => [0, 0, 0],
      onClick: (info) => {
        setSelected(info.object)

        openEditModal()
      }
    }),
    new PolygonLayer({
      id: 'polygon-layer',
      data: areas,
      pickable: true,
      stroked: true,
      filled: true,
      wireframe: true,
      lineWidthMinPixels: 1,
      getPolygon: d => d.contour,
      getElevation: d => 10,
      getFillColor: d => [100, 100, 250, 25.5],
      getLineColor: [80, 80, 80, 65],
      getLineWidth: 1,
      onHover: (info) => {
        !mode && setHoveredArea(info.object)
      },
      onClick: (info) => {
        !mode && setSelectedArea(info.object)
      }
    }),
    new PolygonLayer({
      id: 'polygon-layer',
      data: lineCountours(),
      pickable: true,
      stroked: true,
      filled: true,
      wireframe: true,
      lineWidthMinPixels: 1,
      getPolygon: d => d.contour,
      getElevation: d => 10,
      getFillColor: d => [250, 250, 0, 25.5],
      getLineColor: [80, 80, 80, 125],
      getLineWidth: 1
    }),
    new PolygonLayer({
      id: 'polygon-layer',
      data: !mode && hoveredArea && [hoveredArea],
      pickable: true,
      stroked: true,
      filled: true,
      wireframe: true,
      lineWidthMinPixels: 1,
      getPolygon: d => d.contour,
      getElevation: d => 10,
      getFillColor: d => [255, 255, 0, 35.5],
      getLineColor: [255, 160, 0, 125],
      getLineWidth: 1,
    }),
    new PolygonLayer({
      id: 'polygon-layer',
      data: selectedArea && [selectedArea],
      pickable: true,
      stroked: true,
      filled: true,
      wireframe: true,
      lineWidthMinPixels: 1,
      getPolygon: d => d.contour,
      getElevation: d => 10,
      getFillColor: d => [255, 255, 0, 125.5],
      getLineColor: [255, 160, 0, 125],
      getLineWidth: 1,
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
      getLineColor: d => [0, 0, 0],
      onDragStart: (info, event) => {
        console.log('onDragStart', info, event)
      },
      onDragEnd: (info, event) => {
        console.log('onDragEnd', info, event)
      }
    }),
    // new LineLayer({
    //   id: 'line-layer',
    //   data: lineCoordinates(),
    //   pickable: true,
    //   getWidth: 3,
    //   getSourcePosition: d => d.from.coordinates,
    //   getTargetPosition: d => d.to.coordinates,
    //   getColor: d => [250, 250, 100]
    // }),
  ]

  const onClick = (event) => {
    if (mode === 'area') {
      const [longitude, latitude] = event.coordinate

      setLatitude(latitude)
      setLongitude(longitude)

      setAreaData(areaData => [...areaData, {
        exits: 1,
        coordinates: [+longitude, +latitude]
      }])
    } else {
      const picked = event.object;

      if (picked) {

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
      <AddCarModal
        isOpen={modalAddOpen}
        onClose={closeAddModal}
        onSubmit={addCar}
      />
      {selected && <EditCarModal
        item={selected}
        isOpen={modalEditOpen}
        onClose={closeEditModal}
        onRemove={deleteCar}
        onSubmit={editCar}
      />}
      <DeckGL
        onClick={onClick}
        initialViewState={{
          longitude: 27.478700,
          latitude: 53.868718,
          zoom: 16.0,
          minZoom: 10,
          maxZoom: 30,
          pitch: 0,
          bearing: 0
        }}
        height="100%"
        width="100%"
        zIndex="5"
        controller={{dragPan: true}}
        layers={layers}
        getTooltip={({object}) => object && `${object.number}\n${object.notice}`}
        style={{zIndex: '1'}}
        getCursor={({ isDragging }) => (isDragging ? 'grabbing' : (!mode && hoveredArea ? 'pointer' : 'grab'))}
      >
        <StaticMap
          mapStyle="mapbox://styles/mapbox/satellite-v9"
          mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
        />
      </DeckGL>
      <AddAreaButton {...{mode, setMode, areas, setAreas, areaData, setAreaData}} />
      <AddPersonButton/>
    </div>
  )
}

export default App;

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
