import React, { useRef, useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import ReactModal from 'react-modal';
import DeckGL from '@deck.gl/react';
import {
  PathLayer,
  ScatterplotLayer,
  LineLayer,
  PolygonLayer,
} from '@deck.gl/layers';

// import { ContourLayer } from '@deck.gl/aggregation-layers';

import { StaticMap } from 'react-map-gl';
import { TerrainLayer } from '@deck.gl/geo-layers';
import axios from 'axios';
import styled from 'styled-components';

import { AddCarModal } from './modals/AddCarModal';
import { EditCarModal } from './modals/EditCarModal';
import { AddNoteModal } from './modals/AddNoteModal';
import { ShowAreaModal } from './modals/ShowAreaModal';
import { EditAreaModal } from './modals/EditAreaModal';
import { AddPersonModal } from './modals/AddPersonModal';

import { AddNoteButton } from './buttons/AddNoteButton';
import { AddAreaButton } from './buttons/AddAreaButton';
import { AddPersonButton } from './buttons/AddPersonButton';
import { ModePointButton } from './buttons/ModePointButton';
import { ModeShowButton } from './buttons/ModeShowButton';
import { ModeEditButton } from './buttons/ModeEditButton';

import { getCars, createCar, updateCar, removeCar } from '../api/car';
import { getAreas, createArea, updateArea, removeArea } from '../api/area';
import { createNote } from '../api/note';
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
  const [selectableAreas, setSelectableAreas] = useState([]);
  const [contourAreas, setContourAreas] = useState([]);
  const [areaData, setAreaData] = useState([]);

  const [modalAddCar, setModalAddCar] = useState(false);
  const [modalEditCar, setModalEditCar] = useState(false);
  const [modalAddNote, setModalAddNote] = useState(false);
  const [modalShowArea, setModalShowArea] = useState(false);
  const [modalEditArea, setModalEditArea] = useState(false);
  const [modalAddPerson, setModalAddPerson] = useState(false);

  const [zoom, setZoom] = useState(null);

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

  const openAddNoteModal = () => setModalAddNote(true);
  const closeAddNoteModal = () => setModalAddNote(false);

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
  const refreshAreas = () => {
    setSelectableAreas(areas.filter((area) => area.maxZoom > zoom));
    setContourAreas(areas.filter((area) => area.maxZoom <= zoom));
  }

  useEffect(() => {
    loadCars();
    loadAreas();
  }, [])

  useEffect(() => {
    refreshAreas();
  }, [areas])

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

  const addNote = async (form) => {
    const token = document.querySelector('[name=csrf-token]').content;
    const params = { note: { ...form }};

    await createNote(params, token);
    closeAddNoteModal();
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

  const handlePointMode = () => {
    if (mode === 'point') {
      setMode(null);
    } else {
      setMode('point');
    }
  }

  const handleShowMode = () => {
    if (mode === 'show') {
      setMode(null);
    } else {
      setMode('show');
    }
  }

  const handleEditMode = () => {
    if (mode === 'edit') {
      setMode(null);
    } else {
      setMode('edit');
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

  // const CONTOURS = [
  //   {threshold: 1, color: [255, 0, 0, 255], strokeWidth: 1}, // => Isoline for threshold 1
  //   {threshold: 5, color: [0, 255, 0], strokeWidth: 2}, // => Isoline for threshold 5
  //   {threshold: [6, 10], color: [0, 0, 255, 128]} // => Isoband for threshold range [6, 10)
  // ];

  // const contourLayer = new ContourLayer({
  //   id: 'contourLayer',
  //   // Three contours are rendered.
  //   data: cars,
  //   contours: CONTOURS,
  //   cellSize: 200,
  //   getPosition: d => d.coordinates,
  //   getLineColor: d => [100, 100, 250, 35.5],
  // });

  const carsLayer = new ScatterplotLayer({
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
  });

  const hoveredAreaLayer = new PolygonLayer({
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
  });

  const areasLayer = new PolygonLayer({
    id: 'polygon-layer2',
    data: selectableAreas,
    pickable: true,
    stroked: true,
    filled: true,
    wireframe: true,
    lineWidthMinPixels: 1,
    getPolygon: d => d.contour,
    getElevation: d => 10,
    getFillColor: d => [100, 100, 250, 35.5],
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
  });

  const contourAreasLayer = new PolygonLayer({
    id: 'contourAreasLayer',
    data: contourAreas,
    pickable: true,
    stroked: true,
    filled: true,
    wireframe: true,
    lineWidthMinPixels: 1,
    getPolygon: d => d.contour,
    getElevation: d => 10,
    getFillColor: d => [0, 0, 0, 0],
    getLineColor: [255, 0, 0, 205],
    getLineWidth: 1,
    onHover: (info) => {
      // if (zoom > 15) {
      //   setHoveredArea(null);
      // }
    },
  });

  const layers = [
    // carsLayer,
    // hoveredAreaLayer,
    // areasLayer,
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

  // if (zoom > 15) {
  layers.push(contourAreasLayer);
  // } else {
  layers.push(hoveredAreaLayer);
  layers.push(areasLayer);
  // }

  // layers.push(contourLayer);

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
        setSelectedArea(null);

        if (mode === 'point') {
          const [longitude, latitude] = event.coordinate;

          setLatitude(latitude);
          setLongitude(longitude);

          openAddCarModal();
        }
      }
    }
  }

  return (
    <div>
      <div style={{position: 'absolute', top: '30px', zIndex: 10, color: '#fff'}}>zoom: {zoom}</div>
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
      <AddNoteModal
        isOpen={modalAddNote}
        item={selectedArea}
        onClose={closeAddNoteModal}
        onSubmit={addNote}
      />
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
          zoom: 15.0,
          pitch: 0,
          bearing: 0
        }}
        height="100%"
        width="100%"
        zIndex="5"
        controller={{dragPan: true}}
        layers={layers}
        getTooltip={({object}) => object && `${object.number}\n${object.notice?.match(/.{1,50}/g)?.join('\n')}`}
        style={{zIndex: '1'}}
        getCursor={({ isDragging }) => (isDragging ? 'grabbing' : (hoveredArea ? 'pointer' : 'grab'))}
        onViewStateChange={(viewState) => {
          setZoom(viewState.viewState.zoom);
          refreshAreas();
        }}
      >
        <StaticMap
          mapStyle="mapbox://styles/mapbox/satellite-v9"
          mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
        />
      </DeckGL>
      <ModePointButton onClick={handlePointMode}></ModePointButton>
      <ModeShowButton onClick={handleShowMode}></ModeShowButton>
      <ModeEditButton onClick={handleEditMode}></ModeEditButton>
      <AddAreaButton
        mode={mode}
        onClick={toogleAreaMode}
        onSubmit={addArea}
      />
      <AddNoteButton onClick={openAddNoteModal}/>
      <AddPersonButton onClick={openAddPersonModal}/>
    </div>
  )
}

export default App;

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
