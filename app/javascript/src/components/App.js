import React, { useRef, useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import ReactModal from 'react-modal';
import styled from 'styled-components';
import { StaticMap } from 'react-map-gl';
import DeckGL from '@deck.gl/react';

import { modes } from '../constants';

import {
  setZoom,
  setSelectedAreaData,
  setHoveredAreaId,
  addNewAreaPoint,
  // setSelectedAreaId,
  // fetchPoints,
  // resetArea,
  // setSelectedArea,
} from '../store/actions';

import {
  loadAreasData,
  // setSelectedAreaById,
} from 'src/store/thunks';

import {
  PathLayer,
  ScatterplotLayer,
  LineLayer,
  PolygonLayer,
} from '@deck.gl/layers';

// import { AreaModeButton } from './modes/area';
import { AreaMode, EditMode, NoteMode } from './modes';

// import { getCars, createCar, updateCar, removeCar } from '../api/car';
// import { getAreas, createArea, updateArea, removeArea } from '../api/area';
// import { getCompanies } from '../api/company';
// import { createNote } from '../api/note';
// import { createPerson } from '../api/person';

// import { pointToScatterplotObject, areaToPolygonObject } from '../services/deckGl';

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

const App = (props) => {
  const {
    mode,
    zoom,
    areasData,
    selectedAreaData,
    hoveredAreaId,
    newAreaPoints,
    // selectedAreaId,
    // areasStatus,
    // fetchAreas,
    // areaNew,
    // points,
    // pointsStatus,
    // fetchPoints,
    // selectedAreaId,
    // setSelectedArea,
    // setSelectedAreaById,
    // setSelectedAreaId,
    addNewAreaPoint,
    areaNew,
    setZoom,
    loadAreasData,
    setSelectedAreaData,
    setHoveredAreaId,
  } = props;

  // const [deckAreas, setDeckAreas] = useState([]);
  // const [deckPoints, setDeckPoints] = useState([]);

  // const [selectableAreas, setSelectableAreas] = useState([]);
  // const [contourAreas, setContourAreas] = useState([]);
  // const [areaData, setAreaData] = useState([]);

  // const [modalAddCar, setModalAddCar] = useState(false);
  // const [modalEditCar, setModalEditCar] = useState(false);
  // const [modalAddNote, setModalAddNote] = useState(false);
  // const [modalShowArea, setModalShowArea] = useState(false);
  // const [modalEditArea, setModalEditArea] = useState(false);
  // const [modalAddPerson, setModalAddPerson] = useState(false);

  // const [zoom, setZoom] = useState(null);

  // const [selectedCar, setSelectedCar] = useState(null);
  // const [hoveredArea, setHoveredArea] = useState(null);
  // const [selectedArea, setSelectedArea] = useState(null);

  // const [selectedMode, setSelectedMode] = useState(null);

  // const openAddCarModal = () => setModalAddCar(true);
  // const closeAddCarModal = () => setModalAddCar(false);
  // const openEditCarModal = () => setModalEditCar(true);
  // const closeEditCarModal = () => setModalEditCar(false);
  // const openAddNoteModal = () => setModalAddNote(true);
  // const closeAddNoteModal = () => setModalAddNote(false);
  // const openAddPersonModal = () => setModalAddPerson(true);
  // const closeAddPersonModal = () => setModalAddPerson(false);
  // const openEditAreaModal = () => setModalEditArea(true);
  // const closeEditAreaModal = () => setModalEditArea(false);
  // const openShowAreaModal = () => setModalShowArea(true);
  // const closeShowAreaModal = () => setModalShowArea(false);

  // const selectedArea = areas.find((area) => (+area.id === selectedAreaId));

  useEffect(() => {
    loadAreasData();
  }, []);

  // useEffect(() => {
  //   switch (pointsStatus) {
  //     case requestStatuses.IDLE: {
  //       fetchPoints();
  //       break;
  //     }
  //     case requestStatuses.SECCEEDED: {
  //       setDeckPoints(points.map(pointToScatterplotObject));
  //       break;
  //     }
  //   }
  // }, [pointsStatus]);

  // const changeSelectedArea = (id) => {
  //   const area = areas.find((area) => area.id === id);

  //   setSelectedArea(area);
  // }

  // // Loaders

  // const loadCars = async () => {
  //   const cars = await getCars();
  //   const deckGlCars = cars.map(carToScatterplotObject);

  //   setCars(deckGlCars);
  // };

  // const loadAreas = async () => {
  //   const areas = await getAreas();
  //   const deckGlAreas = areas.map(areaToPolygonObject);

  //   setAreas(deckGlAreas);
  // };

  // const loadCompanies = async () => {
  //   const companies = await getCompanies();

  //   setCompanies(companies);
  // };

  // const refreshAreas = () => {
  //   const selectableAreas = areas.filter((area) => area.maxZoom > zoom);
  //   const contourAreas = areas.filter((area) => area.maxZoom <= zoom)

  //   setSelectableAreas(selectableAreas);
  //   setContourAreas(contourAreas);

  //   if (hoveredArea && contourAreas.includes(hoveredArea)) {
  //     setHoveredArea(null);
  //   }
  // };

  // const addCar = async (form) => {
  //   const token = document.querySelector('[name=csrf-token]').content;
  //   const params = { car: { latitude, longitude, ...form }};
  //   const car = await createCar(params, token);
  //   const deckGlCar = carToScatterplotObject(car);

  //   setCars([...cars, deckGlCar]);
  //   closeAddModal();
  // };

  // const editCar = async ({ id, ...form }) => {
  //   const token = document.querySelector('[name=csrf-token]').content;
  //   const params = { car: { ...form }};
  //   const car = await updateCar(id, params, token);
  //   const deckGlCar = carToScatterplotObject(car);

  //   setCars([...cars.filter((car) => { return car.id !== id }), deckGlCar]);
  //   closeEditCarModal();
  // };

  // const deleteCar = async ({ id }) => {
  //   const token = document.querySelector('[name=csrf-token]').content;
  //   await removeCar(id, token);

  //   setCars(cars.filter((car) => { return car.id !== id }));
  //   closeEditCarModal();
  // };

  // const addNote = async (form) => {
  //   const token = document.querySelector('[name=csrf-token]').content;
  //   const params = { note: { ...form }};

  //   await createNote(params, token);
  //   closeAddNoteModal();
  // };

  // const addPerson = async (form) => {
  //   const token = document.querySelector('[name=csrf-token]').content;
  //   const params = { person: { ...form }};

  //   const person = await createPerson(params, token);
  //   closeAddPersonModal();

  //   return person;

  //   // const area = areas.find((area) => area.id === form.area_id);

  //   // if (area) {
  //   //   area.people = [...area.people, person];
  //   //   setAreas([...areas, area]);
  //   // }
  // };

  // const addArea = async (form) => {
  //   const token = document.querySelector('[name=csrf-token]').content;
  //   const params = {
  //     area: {
  //       coordinates: areaData.map(data => JSON.stringify(data.coordinates)),
  //       area_id: selectedArea?.id,
  //       ...form
  //     }
  //   };

  //   const area = await createArea(params, token);
  //   const deckGlArea = areaToPolygonObject(area);

  //   setAreas([...areas, deckGlArea]);
  //   setAreaData([]);

  //   return area;
  // };

  // const editArea = async ({ id, ...form }) => {
  //   const token = document.querySelector('[name=csrf-token]').content;
  //   const coordinates = areaData.map(data => JSON.stringify(data.coordinates));
  //   const params = { area: { ...form }};
  //   if (coordinates.length > 0) {
  //     params['area']['coordinates'] = coordinates;
  //   }
  //   const area = await updateArea(id, params, token);
  //   const deckGlArea = areaToPolygonObject(area);

  //   setAreas([...areas.filter((area) => { return area.id !== id }), deckGlArea]);
  //   setSelectedArea(null);
  //   closeEditAreaModal();
  //   setAreaData([]);
  // };

  // const deleteArea = async ({ id }) => {
  //   const token = document.querySelector('[name=csrf-token]').content;
  //   const area = await removeArea(id, token);

  //   setAreas(areas.filter((area) => { return area.id !== id }));
  //   // setSelectedArea(null);
  //   // closeEditAreaModal();

  //   return area;
  // };

  // Modes

  // const toggleMode = (mode) => {
  //   if (selectedMode === mode) {
  //     setSelectedMode(null);
  //   } else {
  //     setSelectedMode(mode);
  //   }
  // }

  // const handleAreaMode = () => {
  //   // setAreaData([]);
  //   toggleMode('area');
  // };

  // const handlePointMode = () => {
  //   toggleMode('point');
  // };

  // const handleShowMode = () => {
  //   if (selectedArea) {
  //     openShowAreaModal();
  //   } else {
  //     toggleMode('show');
  //   }
  // };

  // const handleEditMode = () => {
  //   if (selectedArea) {
  //     openEditAreaModal();
  //   } else {
  //     toggleMode('edit');
  //   }
  // };

  // // Layers

  // const pointsLayer = new ScatterplotLayer({
  //   id: 'scatterplot-layer1',
  //   data: deckPoints,
  //   pickable: true,
  //   opacity: 0.6,
  //   stroked: true,
  //   filled: true,
  //   radiusScale: 3,
  //   radiusMinPixels: 1,
  //   radiusMaxPixels: 20,
  //   lineWidthMinPixels: 1,
  //   getPosition: d => d.coordinates,
  //   getRadius: d => Math.sqrt(d.exits),
  //   getFillColor: d => [200, 200, 200],
  //   getLineColor: d => [0, 0, 0],
  //   onClick: (info) => {
  //     setSelectedCar(info.object);

  //     // selectedMode === 'edit' && openEditCarModal();
  //   }
  // });

  // const hoveredAreaLayer = new PolygonLayer({
  //   id: 'polygon-layer1',
  //   data: hoveredArea && [hoveredArea],
  //   pickable: true,
  //   stroked: true,
  //   filled: true,
  //   lineWidthMinPixels: 1,
  //   getPolygon: d => d.contour,
  //   getElevation: d => 10,
  //   getFillColor: d => [255, 255, 0, 35.5],
  //   getLineColor: [255, 160, 0, 125],
  //   getLineWidth: 1,
  // });

  const areasLayer = new PolygonLayer({
    id: 'polygon-layer2',
    data: areasData.filter((area) => area.maxZoom > zoom),
    pickable: true,
    stroked: true,
    filled: true,
    lineWidthMinPixels: 1,
    getPolygon: d => d.contour,
    getElevation: d => 10,
    getFillColor: ({ id, areaId, peopleCount, addedPeopleCount }) => {
      let color = null;

      if (selectedAreaData?.id === id) {
        color = [255, 204, 0, 105];
      } else if (!areaId) {
        color = [250, 100, 100, 65.5];
      } else if (peopleCount !== addedPeopleCount) {
        color = [100, 250, 250, 65.5];
      } else {
        color = [100, 250, 100, 65.5];
      }

      if (hoveredAreaId === id) {
        color[3] += 30;
      }

      return color;
    },
    getLineColor: [80, 80, 80, 65],
    getLineWidth: 1,
    onHover: ({ object }) => {
      if (mode !== modes.AREA) {
        setHoveredAreaId(object?.id);
      }
    },
    onClick: ({ object }) => {
      if (mode !== modes.AREA) {
        if (selectedAreaData?.id !== object.id) {
          setSelectedAreaData(object);
        } else {
          setSelectedAreaData(null);
        }
      }

      // selectedMode === 'show' && openShowAreaModal();
      // selectedMode === 'edit' && openEditAreaModal();
    }
  });

  // const contourAreasLayer = new PolygonLayer({
  //   id: 'contourAreasLayer',
  //   data: areasData.filter((area) => area.maxZoom <= zoom),
  //   pickable: false,
  //   stroked: true,
  //   filled: false,
  //   lineWidthMinPixels: 1,
  //   getPolygon: d => d.contour,
  //   getElevation: d => 10,
  //   getFillColor: d => [0, 0, 0, 0],
  //   getLineColor: [255, 0, 0, 205],
  //   getLineWidth: 1,
  // });


  // const selectedAreaLayer = new PolygonLayer({
  //   id: 'polygon-layer3',
  //   data: selectedArea && [selectedArea],
  //   pickable: (selectedArea?.maxZoom || 0) < zoom,
  //   stroked: true,
  //   filled: true,
  //   lineWidthMinPixels: 1,
  //   getPolygon: d => d.contour,
  //   getElevation: d => 10,
  //   getFillColor: d => (d.maxZoom < zoom) ? [255, 255, 0, 15.5] : [255, 255, 0, 125.5],
  //   getLineColor: [255, 160, 0, 125],
  //   getLineWidth: 1,
  // });

  const polygonNewAreaPointsLayer = new PolygonLayer({
    id: 'polygon-layer4',
    data: [newAreaPoints],
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

  const scatterplotNewAreaPointsLayer = new ScatterplotLayer({
    id: 'scatterplot-layer2',
    data: newAreaPoints,
    pickable: true,
    opacity: 0.6,
    stroked: true,
    filled: true,
    radiusScale: 2,
    radiusMinPixels: 1,
    radiusMaxPixels: 20,
    lineWidthMinPixels: 1,
    getPosition: d => d,
    getRadius: d => Math.sqrt(1),
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
    // pointsLayer,
    // selectedAreaLayer,
    // contourAreasLayer,
    // hoveredAreaLayer,
    areasLayer,
    polygonNewAreaPointsLayer,
    scatterplotNewAreaPointsLayer,
  ];

  const onClick = (event) => {
    console.log('mode', mode)
    if (mode === modes.AREA) {
      const [longitude, latitude] = event.coordinate;

      console.log('event.coordinate', event.coordinate)

      addNewAreaPoint(event.coordinate);

      // setLatitude(latitude);
      // setLongitude(longitude);
      // setAreaData(areaData => [...areaData, { exits: 1, coordinates: [+longitude, +latitude] }]);
    } else {
      const picked = event.object;

      if (!picked) {
        // console.log("!!setSelectedArea", setSelectedArea)
        setSelectedAreaData(null);

        // if (mode === 'point') {
        //   const [longitude, latitude] = event.coordinate;

        //   setLatitude(latitude);
        //   setLongitude(longitude);

        //   openAddCarModal();
        // }
      }
    }
  };

  // useEffect(() => {
  //   loadCars();
  //   loadAreas();
  //   loadCompanies();
  // }, []);

  // useEffect(() => {
  //   refreshAreas();
  // }, [areas]);

  const initialViewState = {
    longitude: 27.478700,
    latitude: 53.868718,
    zoom: 13,
    pitch: 0,
    bearing: 0
  };

  return (
    <div>
      <Information>
        zoom: {zoom}
      </Information>
      {
        selectedAreaData && <Mode>{selectedAreaData.number}</Mode>
      }
      <DeckGL
        onClick={onClick}
        initialViewState={initialViewState}
        layers={layers}
        controller={{ dragPan: true }}
        getTooltip={({object}) => object && `${object.number}\n${object.notice?.match(/.{1,50}/g)?.join('\n')}`}
        style={{ zIndex: '1', overflow: 'hidden' }}
        onViewStateChange={({ viewState: { zoom } }) => {
          setZoom(zoom);
          {/*setHoveredAreaId(null);*/}
          {/*refreshAreas();*/}
        }}
        getCursor={({ isDragging }) => (isDragging ? 'grabbing' : (hoveredAreaId ? 'pointer' : 'grab'))}
      >
        {/*{onAddArea={addArea}}*/}
        <StaticMap
          mapStyle="mapbox://styles/mapbox/satellite-v9"
          mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
        />
      </DeckGL>
{/*      {
        modalAddCar && <AddCarModal
          isOpen={modalAddCar}
          onClose={closeAddCarModal}
        />
      }*/}
          {/*onSubmit={addCar}*/}
{/*      {
        selectedCar && modalEditCar && <EditCarModal
          item={selectedCar}
          isOpen={modalEditCar}
          onClose={closeEditCarModal}
        />
      }*/}
{/*          onRemove={deleteCar}
          onSubmit={editCar}*/}
          {/*onSubmit={addNote}*/}
{/*      {
        modalAddPerson && <AddPersonModal
          isOpen={modalAddPerson}
          defaultAreaId={selectedArea?.id}
          onClose={closeAddPersonModal}
        />
      }*/}
 {/*     {
        mode === modes.SHOW && selectedAreaId && <ShowModeModal
          isOpen={mode === modes.SHOW}
        />
      }
      {
        mode === modes.EDIT && selectedAreaId && <EditModeModal
          isOpen={mode === modes.EDIT}
        />
      }
      {/*<ModePointButton
        active={selectedMode === 'point'}
        onClick={handlePointMode}
      ></ModePointButton>
      <ModeShowButton
        active={selectedMode === 'show'}
        onClick={handleShowMode}
      ></ModeShowButton>*/}
      {/*<EditModeButton/>*/}
      <EditMode/>
      <AreaMode/>
      <NoteMode/>
      {/*<AddPersonButton onClick={openAddPersonModal}/>*/}
    </div>
  );
}

export default connect(
  (state) => ({
    mode: state.main.mode,
    zoom: state.main.zoom,
    areasData: state.main.areasData,
    // selectedAreaId: state.main.selectedAreaId,
    selectedAreaData: state.main.selectedAreaData,
    hoveredAreaId: state.main.hoveredAreaId,
    // areasStatus: state.areas.status,
    // points: state.points.points,
    // pointsStatus: state.points.status,
    // selectedAreaId: state.modes.selectedAreaId,
    newAreaPoints: state.modes.area.newAreaPoints,
  }),
  (dispatch) => ({
    setZoom: (zoom) => dispatch(setZoom(zoom)),
    loadAreasData: () => dispatch(loadAreasData()),
    setSelectedAreaData: (data) => dispatch(setSelectedAreaData(data)),
    setHoveredAreaId: (id) => dispatch(setHoveredAreaId(id)),
    addNewAreaPoint: (coordinates) => dispatch(addNewAreaPoint(coordinates)),
    // setSelectedAreaId: (id) => dispatch(setSelectedAreaId(id)),
    // fetchPoints: () => dispatch(fetchPoints()),
    // setSelectedAreaById: (id) => dispatch(setSelectedAreaById(id)),
    // setSelectedAreaId: (id) => dispatch(setSelectedAreaId(id)),
  })
)(App);
