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
import { AddPersonModal } from './modals/AddPersonModal';
import { ShowAreaModal } from './modals/ShowAreaModal';
import { EditAreaModal } from './modals/EditAreaModal';

import { AddPersonButton } from './buttons/AddPersonButton';
import { AddAreaButton } from './buttons/AddAreaButton';
import { ModeEditButton } from './buttons/ModeEditButton';
import { ModeShowButton } from './buttons/ModeShowButton';

import { getCars, createCar, updateCar, removeCar } from '../api/car';
import { getAreas, createArea, updateArea, removeArea } from '../api/area';
import { createPerson } from '../api/person';
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

  const [modalAddCar, setModalAddCar] = useState(false);
  const [modalEditCar, setModalEditCar] = useState(false);
  const [modalAddPerson, setModalAddPerson] = useState(false);
  const [modalShowArea, setModalShowArea] = useState(false);
  const [modalEditArea, setModalEditArea] = useState(false);

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);
  const [hoveredArea, setHoveredArea] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null);

  const [mode, setMode] = useState(null)

  const openAddCarModal = () => setModalAddCar(true);
  const closeAddCarModal = () => setModalAddCar(false);

  const openEditCarModal = () => setModalEditCar(true);
  const closeEditCarModal = () => setModalEditCar(false);

  const openAddPersonModal = () => setModalAddPerson(true);
  const closeAddPersonModal = () => setModalAddPerson(false);

  const openEditAreaModal = () => setModalEditArea(true);
  const closeEditAreaModal = () => setModalEditArea(false);

  const openShowAreaModal = () => setModalShowArea(true);
  const closeShowAreaModal = () => setModalShowArea(false);

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
    closeEditCarModal();
  }

  const deleteCar = async ({ id }) => {
    const token = document.querySelector('[name=csrf-token]').content;
    await removeCar(id, token);

    setCars(cars.filter((car) => { return car.id !== id }));
    closeEditCarModal();
  }

  const addPerson = async (form) => {
    const token = document.querySelector('[name=csrf-token]').content;
    const params = { person: { ...form }};

    await createPerson(params, token);
    closeAddPersonModal();
  }

  const toogleAreaMode = () => {
    setAreaData([]);
    if (mode === 'area') {
      setMode(null);
    } else {
      setMode('area');
    }
  }

  const handleEditMode = () => {
    if (mode === 'edit') {
      setMode(null);
    } else {
      setMode('edit');
    }
  }

  const handleShowMode = () => {
    if (mode === 'show') {
      setMode(null);
    } else {
      setMode('show');
    }
  }

  const addArea = async (form) => {
    const token = document.querySelector('[name=csrf-token]').content
    const params = {
      area: {
        coordinates: areaData.map(data => JSON.stringify(data.coordinates))
      }
    }

    const area = await createArea(params, token);
    const deckGlArea = areaToPolygonObject(area);

    setAreas([...areas, deckGlArea]);
    setAreaData([]);
    setMode(null);
  }

  const editArea = async ({ id, ...form }) => {
    const token = document.querySelector('[name=csrf-token]').content;
    const params = { area: { ...form }};
    const area = await updateArea(id, params, token);
    const deckGlArea = areaToPolygonObject(area);

    setAreas([...areas.filter((area) => { return area.id !== id }), deckGlArea]);
    setSelectedArea(null);
    closeEditAreaModal();
  }

  const deleteArea = async ({ id }) => {
    const token = document.querySelector('[name=csrf-token]').content;
    await removeArea(id, token);

    setAreas(areas.filter((area) => { return area.id !== id }));
    setSelectedArea(null);
    closeEditAreaModal();
  }

  const layers = [
    new ScatterplotLayer({
      id: 'scatterplot-layer1',
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
        setSelectedCar(info.object);

        mode === 'edit' && openEditCarModal();
      }
    }),
    new PolygonLayer({
      id: 'polygon-layer1',
      data: hoveredArea && [hoveredArea],
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
      id: 'polygon-layer2',
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
        setHoveredArea(info.object);
      },
      onClick: (info) => {
        setSelectedArea(info.object);

        mode === 'show' && openShowAreaModal();
        mode === 'edit' && openEditAreaModal();
      }
    }),
    new PolygonLayer({
      id: 'polygon-layer3',
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
    new PolygonLayer({
      id: 'polygon-layer4',
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
    new ScatterplotLayer({
      id: 'scatterplot-layer2',
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
        const [longitude, latitude] = event.coordinate;

        setSelectedArea(null);

        setLatitude(latitude);
        setLongitude(longitude);

        openAddCarModal();
      }
    }
  }

  return (
    <div>
      {
        mode && <Mode>{mode}</Mode>
      }
      <AddCarModal
        isOpen={modalAddCar}
        onClose={closeAddCarModal}
        onSubmit={addCar}
      />
      {selectedCar && <EditCarModal
        item={selectedCar}
        isOpen={modalEditCar}
        onClose={closeEditCarModal}
        onRemove={deleteCar}
        onSubmit={editCar}
      />}
      <AddPersonModal
        isOpen={modalAddPerson}
        item={selectedArea}
        onClose={closeAddPersonModal}
        onSubmit={addPerson}
      />
      {selectedArea && <EditAreaModal
        item={selectedArea}
        isOpen={modalEditArea}
        onClose={closeEditAreaModal}
        onRemove={deleteArea}
        onSubmit={editArea}
      />}
      {selectedArea && <ShowAreaModal
        item={selectedArea}
        isOpen={modalShowArea}
        onClose={closeShowAreaModal}
      />}
      <DeckGL
        onClick={onClick}
        initialViewState={{
          longitude: 27.478700,
          latitude: 53.868718,
          zoom: 16.0,
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
        getCursor={({ isDragging }) => (isDragging ? 'grabbing' : (hoveredArea ? 'pointer' : 'grab'))}
      >
        <StaticMap
          mapStyle="mapbox://styles/mapbox/satellite-v9"
          mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
        />
      </DeckGL>
      <ModeShowButton onClick={handleShowMode}></ModeShowButton>
      <ModeEditButton onClick={handleEditMode}></ModeEditButton>
      <AddAreaButton
        mode={mode}
        onClick={toogleAreaMode}
        onSubmit={addArea}
      />
      <AddPersonButton onClick={openAddPersonModal}/>
    </div>
  )
}

export default App;

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
