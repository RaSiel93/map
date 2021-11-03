import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { StaticMap } from 'react-map-gl';
import DeckGL from '@deck.gl/react';

import { modes } from '../constants';

import {
  setZoom,
  setSelectedAreaData,
  setHoveredAreaId,
  addNewAreaPointForAreaMode,
  addPoint,
} from '../store/actions';

import {
  loadAreasData,
  loadCompanies,
  loadPointsData,
} from 'src/store/thunks';

import {
  // PathLayer,
  ScatterplotLayer,
  // LineLayer,
  PolygonLayer,
} from '@deck.gl/layers';

import { AreaMode, EditMode, PointMode, ShowMode, NoteMode } from './modes';

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
    pointsData,
    selectedAreaData,
    hoveredAreaId,
    newAreaPoints,
    addNewAreaPointForAreaMode,
    setZoom,
    loadAreasData,
    loadPointsData,
    loadCompanies,
    setSelectedAreaData,
    setHoveredAreaId,
    addPoint,
  } = props;

  useEffect(() => {
    loadAreasData();
    loadPointsData();
    loadCompanies();
  }, []);

  // const refreshAreas = () => {
  //   const selectableAreas = areas.filter((area) => area.maxZoom > zoom);
  //   const contourAreas = areas.filter((area) => area.maxZoom <= zoom)

  //   setSelectableAreas(selectableAreas);
  //   setContourAreas(contourAreas);

  //   if (hoveredArea && contourAreas.includes(hoveredArea)) {
  //     setHoveredArea(null);
  //   }
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

  // // Layers

  const pointsLayer = new ScatterplotLayer({
    id: 'scatterplot-layer1',
    data: pointsData,
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
    getFillColor: () => {
      // getFillColor: ({ id }) => {
      let color = null;

      // if (selectedAreaData?.id === id) {
      //   color = [255, 204, 0, 105];
      // } else {
      color = [200, 200, 200, 100];
      // }

      // if (hoveredAreaId === id) {
      //   color[3] += 30;
      // }

      return color;
    },
    getLineColor: () => [0, 0, 0],
    onHover: () => {
      // if (mode !== modes.AREA) {
      //   setHoveredAreaId(object?.id);
      // }
    },
    onClick: () => {
      // setSelectedAreaData(info.object);
    }
  });

  const areasLayer = new PolygonLayer({
    id: 'polygon-layer2',
    data: areasData.filter((area) => area.maxZoom > zoom),
    pickable: true,
    stroked: true,
    filled: true,
    lineWidthMinPixels: 1,
    getPolygon: d => d.contour,
    getElevation: () => 10,
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

  const polygonNewAreaPointsLayer = new PolygonLayer({
    id: 'polygon-layer4',
    data: [newAreaPoints],
    pickable: true,
    stroked: true,
    filled: true,
    lineWidthMinPixels: 1,
    getPolygon: d => d,
    getElevation: () => 10,
    getFillColor: () => [250, 250, 0, 25.5],
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
    getRadius: () => 1,
    getFillColor: () => [250, 250, 100],
    getLineColor: () => [0, 0, 0],
    onDragStart: (info, event) => {
      console.log('onDragStart', info, event)
    },
    onDragEnd: (info, event) => {
      console.log('onDragEnd', info, event)
    }
  });

  const layers = [
    pointsLayer,
    // contourAreasLayer,
    areasLayer,
    polygonNewAreaPointsLayer,
    scatterplotNewAreaPointsLayer,
  ];

  const onClick = (event) => {
    switch (mode) {
      case modes.AREA: {
        addNewAreaPointForAreaMode(event.coordinate);
        break;
      }
      case modes.POINT: {
        addPoint(event.coordinate);
        break;
      }
      default: {
        const picked = event.object;

        if (!picked) {
          setSelectedAreaData(null);
        }
      }
    }
  };

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
        <StaticMap
          mapStyle="mapbox://styles/mapbox/satellite-v9"
          mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
        />
      </DeckGL>
      <PointMode/>
      <ShowMode/>
      <EditMode/>
      <AreaMode/>
      <NoteMode/>
      {/*<PersonMode*/}
    </div>
  );
}

App.propTypes = {
  mode: PropTypes.string,
  zoom: PropTypes.number,
  areasData: PropTypes.array,
  pointsData: PropTypes.array,
  selectedAreaData: PropTypes.object,
  hoveredAreaId: PropTypes.number,
  newAreaPoints: PropTypes.array,
  addNewAreaPointForAreaMode: PropTypes.func,
  areaNew: PropTypes.func,
  setZoom: PropTypes.func,
  loadAreasData: PropTypes.func,
  loadPointsData: PropTypes.func,
  loadCompanies: PropTypes.func,
  setSelectedAreaData: PropTypes.func,
  setHoveredAreaId: PropTypes.func,
  addPoint: PropTypes.func,
}

export default connect(
  (state) => ({
    mode: state.main.mode,
    zoom: state.main.zoom,
    areasData: state.main.areasData,
    pointsData: state.main.pointsData,
    selectedAreaData: state.main.selectedAreaData,
    hoveredAreaId: state.main.hoveredAreaId,
    newAreaPoints: state.modes.area.newAreaPoints,
  }),
  (dispatch) => ({
    setZoom: (zoom) => dispatch(setZoom(zoom)),
    loadAreasData: () => dispatch(loadAreasData()),
    loadCompanies: () => dispatch(loadCompanies()),
    loadPointsData: () => dispatch(loadPointsData()),
    setSelectedAreaData: (data) => dispatch(setSelectedAreaData(data)),
    setHoveredAreaId: (id) => dispatch(setHoveredAreaId(id)),
    addNewAreaPointForAreaMode: (coordinates) => dispatch(addNewAreaPointForAreaMode(coordinates)),
    addPoint: (coordinates) => dispatch(addPoint(coordinates)),
  })
)(App);
