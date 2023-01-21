import { connect } from 'react-redux';
import { StaticMap } from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import { MAPBOX_ACCESS_TOKEN, API_URL, DEBOUNCE_TIME, modes } from 'constants';

import {
  setZoom,
  setSelectedAreaData,
  setHoveredAreaId,
  addNewAreaPointForAreaMode,
  addPoint,
} from 'store/actions';

import {
  // PathLayer,
  ScatterplotLayer,
  // LineLayer,
  PolygonLayer,
  IconLayer,
} from '@deck.gl/layers';

const Map = (props) => {
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
    setSelectedAreaData,
    setHoveredAreaId,
    addPoint,
    setLatitude,
    setLongitude
  } = props;

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

  const iconLayer = new IconLayer({
    id: 'icon-layer',
    data: areasData.filter((area) => area.logoUrl),
    pickable: true,
    sizeScale: 1,
    sizeMinPixels: 20,
    sizeMaxPixels: 140,
    getPosition: d => d.longitude && d.latitude ? [+d.longitude, +d.latitude] : d.contour[0],
    getSize: d => (zoom - 10) * 14,
    getIcon: d => ({
      url: `${API_URL}${d.logoUrl}`,
      width: 128,
      height: 128,
    }),
    onClick: ({ object }) => {
      if (mode !== modes.AREA) {
        if (selectedAreaData?.id !== object.id) {
          setSelectedAreaData(object);
        } else {
          setSelectedAreaData(null);
        }
      }
    }
  })

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
    longitude: +localStorage.getItem('longitude') || 27.878700,
    latitude: +localStorage.getItem('latitude') || 53.868718,
    zoom: +localStorage.getItem('zoom') || 6.4,
    pitch: 0,
    bearing: 0
  };

  const layers = [
    pointsLayer,
    // contourAreasLayer,
    areasLayer,
    polygonNewAreaPointsLayer,
    scatterplotNewAreaPointsLayer,
    iconLayer,
  ];

  const controller = { dragPan: true }

  const getTooltip = ({object}) => object && `${object.number}\n${object.notice?.match(/.{1,50}/g)?.join('\n')}`

  const style = { zIndex: '1', overflow: 'hidden' }

  const onViewStateChange = ({ viewState: { zoom, longitude, latitude } }) => {
    setZoom(zoom)
    setLongitude(longitude)
    setLatitude(latitude)
    {/*setHoveredAreaId(null);*/}
    {/*refreshAreas();*/}
  }

  const getCursor = ({ isDragging }) => (isDragging ? 'grabbing' : (hoveredAreaId ? 'pointer' : 'grab'))

  return (
    <DeckGL
      onClick={onClick}
      initialViewState={initialViewState}
      layers={layers}
      controller={controller}
      getTooltip={getTooltip}
      style={style}
      onViewStateChange={onViewStateChange}
      getCursor={getCursor}
    >
      <StaticMap
        mapStyle="mapbox://styles/mapbox/satellite-v9"
        mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
      />
    </DeckGL>
  )
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
    setSelectedAreaData: (data) => dispatch(setSelectedAreaData(data)),
    setHoveredAreaId: (id) => dispatch(setHoveredAreaId(id)),
    addNewAreaPointForAreaMode: (coordinates) => dispatch(addNewAreaPointForAreaMode(coordinates)),
    addPoint: (coordinates) => dispatch(addPoint(coordinates)),
  })
)(Map);
