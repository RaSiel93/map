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
  TextLayer,
  PolygonLayer,
  IconLayer,
} from '@deck.gl/layers';

const convertHexToRGBA = (hexCode, opacity = 1) => {
  let hex = hexCode.replace('#', '');

  if (hex.length === 3) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
  }

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  /* Backward compatibility for whole number based opacity values. */
  if (opacity > 0.01 && opacity <= 1) {
    opacity = opacity * 255;
  }

  return [r, g , b, opacity];
};

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

  const data = areasData.filter(({ maxZoom, tags }) => {
    const adminLevelTag = tags.find(({ attributes: { key, value }}) => key === 'admin_level')

    if (adminLevelTag) {
      if (adminLevelTag.attributes.value === "2") {
        return zoom < 6.0
      } else if (adminLevelTag.attributes.value === "4") {
        return zoom < 7.0 && zoom > 6.0
      } else if (adminLevelTag.attributes.value === "6") {
        return zoom < 10 && zoom > 7.0
      } else if (adminLevelTag.attributes.value === "8") {
        return zoom < 11 && zoom > 10.0
      } else if (adminLevelTag.attributes.value === "9") {
        return zoom < 14 && zoom > 11.0
      } else if (adminLevelTag.attributes.value === "10") {
        return zoom < 14 && zoom > 11.0
      } else {
        return maxZoom > zoom
      }
    }

    return maxZoom > zoom
  })

  const areasLayer = new PolygonLayer({
    id: 'polygon-layer',
    data,
    pickable: true,
    // extruded: true,
    filled: true,
    getPolygon: d => d.contour,
    // wireframe: true,
    // getElevation: ({ id, tags }) => {
    //   let resultElevation = 0
    //   let hoverMultiplier = 1

    //   const adminLevelTag = tags.find(({ attributes: { key, value }}) => key === 'admin_level')

    //   if (adminLevelTag) {
    //     if (adminLevelTag.attributes.value === "2") {
    //       resultElevation = 5000
    //       hoverMultiplier = 5
    //     } else if (adminLevelTag.attributes.value === "4") {
    //       resultElevation = 1600
    //       hoverMultiplier = 4
    //     } else if (adminLevelTag.attributes.value === "6") {
    //       resultElevation = 500
    //       hoverMultiplier = 3
    //     } else if (adminLevelTag.attributes.value === "8") {
    //       resultElevation = 200
    //       hoverMultiplier = 2
    //     } else if (adminLevelTag.attributes.value === "9") {
    //       resultElevation = 100
    //       hoverMultiplier = 1.5
    //     } else if (adminLevelTag.attributes.value === "10") {
    //       resultElevation = 100
    //       hoverMultiplier = 1.5
    //     } else {
    //       resultElevation = 10
    //       hoverMultiplier = 3
    //     }
    //   }

    //   if (hoveredAreaId === id || selectedAreaData?.id === id) {
    //     resultElevation *= hoverMultiplier
    //   }

    //   return resultElevation
    // },
    getFillColor: ({ id, areaId, peopleCount, addedPeopleCount, color }) => {
      let fillColor = null;

      if (selectedAreaData?.id === id) {
        fillColor = [255, 204, 0, 205];
      } else {//if (!areaId) {
      //   color = [250, 100, 100, 65.5];
      // } else if (peopleCount !== addedPeopleCount) {
      //   color = [100, 250, 250, 65.5];
      // } else {
        // [100, 250, 100, 65.5]
        fillColor = color ? convertHexToRGBA(color, 0.9) : [200, 250, 200, 65.5];
      }

      if (hoveredAreaId === id) {
        fillColor[3] -= 30;
      }

      return fillColor;
    },
    getLineColor: [255, 255, 255],
    getLineWidth: ({ id, tags }) => {
      let resultElevation = 0
    //   let hoverMultiplier = 1

      const adminLevelTag = tags.find(({ attributes: { key, value }}) => key === 'admin_level')

      if (adminLevelTag) {
        if (adminLevelTag.attributes.value === "2") {
          resultElevation = 5000
          // hoverMultiplier = 5
        } else if (adminLevelTag.attributes.value === "4") {
          resultElevation = 1600
          // hoverMultiplier = 4
        } else if (adminLevelTag.attributes.value === "6") {
          resultElevation = 500
          // hoverMultiplier = 3
        } else if (adminLevelTag.attributes.value === "8") {
          resultElevation = 200
          // hoverMultiplier = 2
        } else if (adminLevelTag.attributes.value === "9") {
          resultElevation = 100
          // hoverMultiplier = 1.5
        } else if (adminLevelTag.attributes.value === "10") {
          resultElevation = 100
          // hoverMultiplier = 1.5
        } else {
          resultElevation = 10
          // hoverMultiplier = 3
        }
      }

      // if (hoveredAreaId === id || selectedAreaData?.id === id) {
        // resultElevation *= hoverMultiplier
      // }

      return resultElevation
    },
    lineJointRounded: true,
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

  const textData = data.filter(({ tags, maxZoom }) => {
    const adminLevelTag = tags.find(({ attributes: { key, value }}) => key === 'admin_level')

    if (adminLevelTag) {
      if (adminLevelTag.attributes.value === "2") {
        return zoom < 6.0
      } else if (adminLevelTag.attributes.value === "4") {
        return zoom < 7.0 && zoom > 6.0
      } else if (adminLevelTag.attributes.value === "6") {
        return zoom < 10 && zoom > 7.0
      } else if (adminLevelTag.attributes.value === "8") {
        return zoom < 11 && zoom > 10.0
      } else if (adminLevelTag.attributes.value === "9") {
        return zoom < 14 && zoom > 11.0
      } else if (adminLevelTag.attributes.value === "10") {
        return zoom < 14 && zoom > 11.0
      } else {
        // return maxZoom > zoom
      }
    }

    return false
  })

  const titleLayer = new TextLayer({
    id: 'text-layer',
    data: textData,
    pickable: true,
    getPosition: ({ longitude, latitude }) => [+longitude, +latitude],
    getText: d => d.number,
    characterSet: 'auto',
    fontFamily: 'sans-serif',
    backgroundPadding: [6, 6, 6, 6],
    maxWidth: 500,
    getSize: 14,
    background: true,
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
    id: 'polygon-layer-new',
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
    titleLayer
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
