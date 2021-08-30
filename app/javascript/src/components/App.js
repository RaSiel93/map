import React, { useRef, useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import ReactModal from 'react-modal';
import axios from 'axios';
import styled from 'styled-components';
import { StaticMap } from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import {
  PathLayer,
  ScatterplotLayer,
  LineLayer,
  PolygonLayer,
} from '@deck.gl/layers';

import {
  AddCarModal,
  EditCarModal,
  AddNoteModal,
  ShowAreaModal,
  EditAreaModal,
  AddPersonModal,
} from './modals';

import {
  AddNoteButton,
  AddAreaButton,
  AddPersonButton,
  ModePointButton,
  ModeShowButton,
  ModeEditButton,
} from './buttons';

import { getCars, createCar, updateCar, removeCar } from '../api/car';
import { getAreas, createArea, updateArea, removeArea } from '../api/area';
import { getCompanies } from '../api/company';
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
`;

const Information = styled.div`
  position: absolute;
  top: 30px;
  z-index: 10;
  color: #fff;
`;

const App = () => {
  const [cars, setCars] = useState([]);
  const [areas, setAreas] = useState([]);
  const [companies, setCompanies] = useState([]);
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

  const [selectedMode, setSelectedMode] = useState(null);

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

  // Loaders

  const loadCars = async () => {
    const cars = await getCars();
    const deckGlCars = cars.map(carToScatterplotObject);

    setCars(deckGlCars);
  };

  const loadAreas = async () => {
    const areas = await getAreas();
    const deckGlAreas = areas.map(areaToPolygonObject);

    setAreas(deckGlAreas);
  };

  const loadCompanies = async () => {
    const companies = await getCompanies();

    setCompanies(companies);
  };

  const refreshAreas = () => {
    const selectableAreas = areas.filter((area) => area.maxZoom > zoom);
    const contourAreas = areas.filter((area) => area.maxZoom <= zoom)

    setSelectableAreas(selectableAreas);
    setContourAreas(contourAreas);

    if (hoveredArea && contourAreas.includes(hoveredArea)) {
      setHoveredArea(null);
    }
  };

  const addCar = async (form) => {
    const token = document.querySelector('[name=csrf-token]').content;
    const params = { car: { latitude, longitude, ...form }};
    const car = await createCar(params, token);
    const deckGlCar = carToScatterplotObject(car);

    setCars([...cars, deckGlCar]);
    closeAddModal();
  };

  const editCar = async ({ id, ...form }) => {
    const token = document.querySelector('[name=csrf-token]').content;
    const params = { car: { ...form }};
    const car = await updateCar(id, params, token);
    const deckGlCar = carToScatterplotObject(car);

    setCars([...cars.filter((car) => { return car.id !== id }), deckGlCar]);
    closeEditCarModal();
  };

  const deleteCar = async ({ id }) => {
    const token = document.querySelector('[name=csrf-token]').content;
    await removeCar(id, token);

    setCars(cars.filter((car) => { return car.id !== id }));
    closeEditCarModal();
  };

  const addNote = async (form) => {
    const token = document.querySelector('[name=csrf-token]').content;
    const params = { note: { ...form }};

    await createNote(params, token);
    closeAddNoteModal();
  };

  const addPerson = async (form) => {
    const token = document.querySelector('[name=csrf-token]').content;
    const params = { person: { ...form }};

    const person = await createPerson(params, token);
    closeAddPersonModal();

    const area = areas.find((area) => area.id === form.area_id);

    if (area) {
      area.people = [...area.people, person];
      setAreas([...areas, area]);
    }
  };

  const addArea = async (form) => {
    const token = document.querySelector('[name=csrf-token]').content;
    const params = {
      area: {
        coordinates: areaData.map(data => JSON.stringify(data.coordinates)),
        area_id: selectedArea?.id,
      }
    };

    const area = await createArea(params, token);
    const deckGlArea = areaToPolygonObject(area);

    setAreas([...areas, deckGlArea]);
    setAreaData([]);
  };

  const editArea = async ({ id, ...form }) => {
    const token = document.querySelector('[name=csrf-token]').content;
    const params = { area: { ...form }};
    const area = await updateArea(id, params, token);
    const deckGlArea = areaToPolygonObject(area);

    setAreas([...areas.filter((area) => { return area.id !== id }), deckGlArea]);
    setSelectedArea(null);
    closeEditAreaModal();
  };

  const deleteArea = async ({ id }) => {
    const token = document.querySelector('[name=csrf-token]').content;
    await removeArea(id, token);

    setAreas(areas.filter((area) => { return area.id !== id }));
    setSelectedArea(null);
    closeEditAreaModal();
  };

  // Modes

  const toggleMode = (mode) => {
    if (selectedMode === mode) {
      setSelectedMode(null);
    } else {
      setSelectedMode(mode);
    }
  }

  const handleAreaMode = () => {
    setAreaData([]);
    toggleMode('area');
  };

  const handlePointMode = () => {
    toggleMode('point');
  };

  const handleShowMode = () => {
    if (selectedArea) {
      openShowAreaModal();
    } else {
      toggleMode('show');
    }
  };

  const handleEditMode = () => {
    if (selectedArea) {
      openEditAreaModal();
    } else {
      toggleMode('edit');
    }
  };

  // Layers

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

      selectedMode === 'edit' && openEditCarModal();
    }
  });

  const hoveredAreaLayer = new PolygonLayer({
    id: 'polygon-layer1',
    data: hoveredArea && [hoveredArea],
    pickable: true,
    stroked: true,
    filled: true,
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
    lineWidthMinPixels: 1,
    getPolygon: d => d.contour,
    getElevation: d => 10,
    getFillColor: d => {
      if (!d.areaId) {
        return [250, 100, 100, 65.5];
      }
      if (d.peopleCount != d.addedPeopleCount) {
        return [100, 250, 250, 65.5];
      }

      return [100, 250, 100, 65.5];
    },
    getLineColor: [80, 80, 80, 65],
    getLineWidth: 1,
    onHover: (info) => {
      setHoveredArea(info.object);
    },
    onClick: (info) => {
      setSelectedArea(info.object);

      selectedMode === 'show' && openShowAreaModal();
      selectedMode === 'edit' && openEditAreaModal();
    }
  });

  const contourAreasLayer = new PolygonLayer({
    id: 'contourAreasLayer',
    data: contourAreas,
    pickable: false,
    stroked: true,
    filled: false,
    lineWidthMinPixels: 1,
    getPolygon: d => d.contour,
    getElevation: d => 10,
    getFillColor: d => [0, 0, 0, 0],
    getLineColor: [255, 0, 0, 205],
    getLineWidth: 1,
  });

  const selectedAreaLayer = new PolygonLayer({
    id: 'polygon-layer3',
    data: selectedArea && [selectedArea],
    pickable: (selectedArea?.maxZoom || 0) < zoom,
    stroked: true,
    filled: true,
    lineWidthMinPixels: 1,
    getPolygon: d => d.contour,
    getElevation: d => 10,
    getFillColor: d => (d.maxZoom < zoom) ? [255, 255, 0, 15.5] : [255, 255, 0, 125.5],
    getLineColor: [255, 160, 0, 125],
    getLineWidth: 1,
  });

  const polygonAreaModeLayer = new PolygonLayer({
    id: 'polygon-layer4',
    data: [areaData.map(data => data.coordinates)],
    pickable: true,
    stroked: true,
    filled: true,
    lineWidthMinPixels: 1,
    getPolygon: d => d,
    getElevation: d => 10,
    getFillColor: d => [250, 250, 0, 25.5],
    getLineColor: [80, 80, 80, 125],
    getLineWidth: 1
  });

  const pointsAreaModeLayer = new ScatterplotLayer({
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
  });

  const layers = [
    // carsLayer,
    selectedAreaLayer,
    contourAreasLayer,
    hoveredAreaLayer,
    areasLayer,
    polygonAreaModeLayer,
    pointsAreaModeLayer,
  ];

  const onClick = (event) => {
    if (selectedMode === 'area') {
      const [longitude, latitude] = event.coordinate;

      setLatitude(latitude);
      setLongitude(longitude);
      setAreaData(areaData => [...areaData, { exits: 1, coordinates: [+longitude, +latitude] }]);
    } else {
      const picked = event.object;

      if (!picked) {
        setSelectedArea(null);

        if (selectedMode === 'point') {
          const [longitude, latitude] = event.coordinate;

          setLatitude(latitude);
          setLongitude(longitude);

          openAddCarModal();
        }
      }
    }
  };

  useEffect(() => {
    loadCars();
    loadAreas();
    loadCompanies();
  }, []);

  useEffect(() => {
    refreshAreas();
  }, [areas]);

  return (
    <div>
      <Information>
        zoom: {zoom}
      </Information>
      {
        selectedMode && <Mode>{selectedMode}</Mode>
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
        areas={areas}
        companies={companies}
      />
      {selectedArea && <EditAreaModal
        item={selectedArea}
        isOpen={modalEditArea}
        onClose={closeEditAreaModal}
        onRemove={deleteArea}
        onSubmit={editArea}
        areas={areas}
      />}
      {selectedArea && <ShowAreaModal
        item={selectedArea}
        isOpen={modalShowArea}
        onClose={closeShowAreaModal}
        onSubmit={addPerson}
        companies={companies}
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
        controller={{dragPan: true}}
        layers={layers}
        getTooltip={({object}) => object && `${object.number}\n${object.notice?.match(/.{1,50}/g)?.join('\n')}`}
        style={{zIndex: '1', overflow: 'hidden'}}
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
        active={selectedMode === 'area'}
        onClick={handleAreaMode}
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
