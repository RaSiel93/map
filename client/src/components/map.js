import { useEffect, useState, useMemo } from 'react'
import { connect } from 'react-redux'
import { StaticMap } from 'react-map-gl'
import { WebMercatorViewport } from '@deck.gl/core';
import DeckGL from '@deck.gl/react'
import { MAPBOX_ACCESS_TOKEN, API_URL, DEBOUNCE_TIME, modes, FILTER_START_DATE, FILTER_CITY, FILTER_TAGS } from 'constants'
import Supercluster from 'supercluster';

import {
  setLatitude,
  setLongitude,
  setZoom,
  setSelectedAreaData,
  setHoveredAreaId,
  addNewAreaPointForAreaMode,
  addPoint,
} from 'store/actions';

import {
  ScatterplotLayer,
  TextLayer,
  PolygonLayer,
  IconLayer,
} from '@deck.gl/layers';
import jsCookie from 'js-cookie'
import { convertHexToRGBA } from 'utils/helper';

const Map = (props) => {
  const {
    tags,
    latitude,
    longitude,
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
    setLongitude,
    searchResult,
    selectedTags,
    mapStyle,
    titleShow,
    iconShow,
    clusterShow,
    clusterShowValue,
    searchHoveredAreaId,
    areaShow,
  } = props;

  // const [clusters, setClusters] = useState([]);
  const [bounds, setBounds] = useState([]);
  const [clustersGroup, setClustersGroup] = useState([]);
  const [clustersLayersGroup, setClustersLayersGroup] = useState([]);
  const [adminLevelTags, setAdminLevelTags] = useState({});

  const [clusterIndexes, setClusterIndexes] = useState([]);

  useEffect(() => {
    const clusterIndexes = selectedTags.map(({ color }) => new Supercluster({
      properties: { color },
      map: (props) => ({people_count: props.people_count}),
      reduce: (accumulated, props) => { accumulated.people_count += props.people_count; }
    }));

    setClusterIndexes(clusterIndexes);
  }, [selectedTags])

  useEffect(() => {
    if (tags.length === 0) {
      return;
    }

    const adminLevelTags = {};

    tags.find(({ label }) => label === 'admin_level').options.forEach(({ id, name }) => {
      adminLevelTags[name] = id;
    });

    setAdminLevelTags(adminLevelTags);
  }, [tags])

  // const pointsLayer = new ScatterplotLayer({
  //   id: 'scatterplot-layer1',
  //   data: pointsData,
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
  //   getFillColor: () => {
  //     // getFillColor: ({ id }) => {
  //     let color = null;

  //     // if (selectedAreaData?.id === id) {
  //     //   color = [255, 204, 0, 105];
  //     // } else {
  //     color = [200, 200, 200, 100];
  //     // }

  //     // if (hoveredAreaId === id) {
  //     //   color[3] += 30;
  //     // }

  //     return color;
  //   },
  //   getLineColor: () => [0, 0, 0],
  //   onHover: () => {
  //     // if (mode !== modes.AREA) {
  //     //   setHoveredAreaId(object?.id);
  //     // }
  //   },
  //   onClick: () => {
  //     // setSelectedAreaData(info.object);
  //   }
  // });

  const data = areasData;//.filter(({ id, tagValueIds }) => {
    // if (tagValueIds.includes(adminLevelTags[2])) {
    //   return zoom < 6.0
    // } else if (tagValueIds.includes(adminLevelTags[4])) {
    //   return zoom < 7.0 && zoom > 6.0
    // } else if (tagValueIds.includes(adminLevelTags[6])) {
    //   return zoom < 10 && zoom > 7.0
    // } else if (tagValueIds.includes(adminLevelTags[8])) {
    //   return zoom < 11 && zoom > 10.0
    // } else if (tagValueIds.includes(adminLevelTags[9])) {
    //   return zoom < 14 && zoom > 11.0
    // } else if (tagValueIds.includes(adminLevelTags[10])) {
    //   return zoom < 14 && zoom > 11.0
    // }

  //   return true;
  // })

  const getFillColor = ({ id, areaId, peopleCount, addedPeopleCount, color }) => {
    let fillColor, defaultColor = null;

    if (mapStyle == 'satellite') {
      defaultColor = [200, 250, 200, 65.5]
    } else {
      defaultColor = [0, 0, 0, 125]
    }

    if (selectedAreaData?.id === id) {
      fillColor = [255, 204, 0, 205];
    } else {//if (!areaId) {
    //   color = [250, 100, 100, 65.5];
    // } else if (peopleCount !== addedPeopleCount) {
    //   color = [100, 250, 250, 65.5];
    // } else {
      // [100, 250, 100, 65.5]
      fillColor = color ? convertHexToRGBA(color, 0.5) : defaultColor;
    }

    if (hoveredAreaId === id) {
      fillColor[3] -= 30;
    }

    return fillColor;
  }

  const getLineWidth = ({ id, tagValueIds = [] }) => {
    let resultElevation = 0
    // let hoverMultiplier = 1

      if (tagValueIds.includes(adminLevelTags[2])) {
        resultElevation = 1500
        // hoverMultiplier = 5
      } else if (tagValueIds.includes(adminLevelTags[4])) {
        resultElevation = 800
        // hoverMultiplier = 4
      } else if (tagValueIds.includes(adminLevelTags[6])) {
        resultElevation = 400
        // hoverMultiplier = 3
      } else if (tagValueIds.includes(adminLevelTags[8])) {
        resultElevation = 100
        // hoverMultiplier = 2
      } else if (tagValueIds.includes(adminLevelTags[9])) {
        resultElevation = 20
        // hoverMultiplier = 1.5
      } else if (tagValueIds.includes(adminLevelTags[10])) {
        resultElevation = 20
        // hoverMultiplier = 1.5
      }
    // }

    // if (hoveredAreaId === id || selectedAreaData?.id === id) {
      // resultElevation *= hoverMultiplier
    // }

    return resultElevation
  }

  const getLineColor = [255, 255, 255]

  const getPolygon = d => d.contour

  const onClick = ({ object }) => {
    if (mode !== modes.AREA) {
      if (selectedAreaData?.id !== object.id) {
        setSelectedAreaData(object);
      } else {
        setSelectedAreaData(null);
      }
    }
  }

  const onHover = ({ object }) => {
    if (mode !== modes.AREA) {
      setHoveredAreaId(object?.id);
    }
  }

  const areasLayer = new PolygonLayer({
    id: 'polygon-layer',
    data: areasData,
    getFillColor,
    // getLineWidth,
    getLineWidth: () => 1,
    getLineColor,
    getPolygon,
    onClick,
    onHover,
    pickable: true,
    filled: true,
    lineJointRounded: true,
    // extruded: true,
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
  });

  const selectedAreasLayer = new PolygonLayer({
    id: 'selected-areas-layer',
    data: [selectedAreaData],
    getFillColor,
    // getLineWidth,
    getLineWidth: () => 10,
    getLineColor,
    getPolygon,
    onClick,
    onHover,
    pickable: true,
    filled: true,
    lineJointRounded: true,
  });

  const textData = data;//.filter(({ tagValueIds = [] }) => {
    // const adminLevelTag = tags.find(({ key: { name }}) => name === 'admin_level')

    // if (adminLevelTag) {
  //     if (tagValueIds.includes(adminLevelTags[2])) {
  //       return zoom < 6.0
  //     } else if (tagValueIds.includes(adminLevelTags[4])) {
  //       return zoom < 7.0 && zoom > 6.0
  //     } else if (tagValueIds.includes(adminLevelTags[6])) {
  //       return zoom < 10 && zoom > 7.0
  //     } else if (tagValueIds.includes(adminLevelTags[8])) {
  //       return zoom < 11 && zoom > 10.0
  //     } else if (tagValueIds.includes(adminLevelTags[9])) {
  //       return zoom < 14 && zoom > 11.0
  //     } else if (tagValueIds.includes(adminLevelTags[10])) {
  //       return zoom < 14 && zoom > 11.0
  //     }
  //     // return maxZoom > zoom
  //   // }

  //   return false
  // })

  const titleLayer = new TextLayer({
    id: 'text-layer',
    data: textData,
    pickable: true,
    getPosition: ({ longitude, latitude }) => [+longitude, +latitude],
    getText: d => d.number,
    characterSet: 'auto',
    fontFamily: 'sans-serif',
    fontWeight: "bold",
    backgroundPadding: [6, 6, 6, 6],
    maxWidth: 500,
    getSize: 14,
    background: true,
  });

  const tagSelectedAreasGroup = useMemo(() => {
    return selectedTags.map(({ id: selectedId, color }) => {
      return {
        id: selectedId,
        color,
        data: (data || []).filter(({ tagValueIds }) => {
          return tagValueIds.includes(selectedId)
        })
      }
    })
  }, [data, selectedTags])

  const tagsLayer = new TextLayer({
    id: 'tags-layer',
    data: tagSelectedAreasGroup.flatMap(({ data }) => data),
    pickable: true,
    getPosition: ({ longitude, latitude }) => [+longitude, +latitude],
    getText: d => d.number,
    characterSet: 'auto',
    // fontFamily: 'sans-serif',
    backgroundPadding: [4, 4, 4, 4],
    maxWidth: 500,
    getSize: 12,
    background: true,
    getBorderWidth: 1,
    getPixelOffset: [0, 0]
  })

  // CLUSTER

  useEffect(() => {
    if (clusterIndexes.length !== tagSelectedAreasGroup.length) {
      return
    }

    tagSelectedAreasGroup.forEach(({ data }, index) => {
      const points = data.map((d, i) => ({
        geometry: { type: 'Point', coordinates: [d.longitude, d.latitude] },
        properties: { id: i, people_count: d.peopleCount }
      }))

      clusterIndexes[index].load(points)
    })
  }, [clusterIndexes, tagSelectedAreasGroup]);

  // console.log(tagSelectedAreasGroup)

  useEffect(() => {
    if (!bounds || !zoom) return;

    const newClustersGroup = clusterIndexes.map((clusterIndex) => {
      return clusterIndex.getClusters(bounds, Math.floor(zoom));
    });
    if (JSON.stringify(newClustersGroup) !== JSON.stringify(clustersGroup)) {
      setClustersGroup(newClustersGroup);
    }
  }, [bounds, zoom, clusterIndexes, data]);

  // const getRadius = (d) => d.properties.cluster ? d.properties.people_count / 40 : 1; //* metersPerPixel(d.geometry.coordinates[1]) : 1
  let getRadius = () => 1;

  if(clusterShowValue === 'point_count') {
    getRadius = (d) => d.properties.cluster ? d.properties.point_count : 1;
  } else {
    getRadius = (d) => d.properties.people_count / 40;
  }

  let getText = () => '?';

  if(clusterShowValue === 'point_count') {
    getText = (d) => String(d.properties.point_count || '');
  } else {
    getText = (d) => String(d.properties.people_count || '?');
  }

  // const clustersGroup = [];
  // const clustersTextGroup = [];

  let radiusMinPixels = 1;

  if (clusterShowValue === 'point_count') {
    radiusMinPixels = 8;
  } else {
    radiusMinPixels = 15;
  }

  useEffect(() => {
    const clusterLayersGroup = clustersGroup.map((clusters, index) => {
      return (
        [
          new ScatterplotLayer({
            id: `scatterplot-layer-${index}`,
            data: clusters,
            stroked: true,
            radiusScale: 1,
            radiusMinPixels,
            radiusMaxPixels: 40,
            radiusUnits: 'pixels',
            lineWidthMinPixels: 2,
            getPosition: d => [+d.geometry.coordinates[0], +d.geometry.coordinates[1]],
            getRadius: getRadius,
            getLineColor: [0, 0, 0],
            getFillColor: (d) => {
              const color = clusterIndexes[index].options.properties.color;

              return color ? convertHexToRGBA(color) : [255, 0, 0]
            },
            onDragStart: (info, event) => {
              // console.log('onDragStart', info, event)
            },
            onDragEnd: (info, event) => {
              // console.log('onDragEnd', info, event)
            }
          }),
          new TextLayer({
            id: `text-layer-${index}`,
            // data: clusters.filter(d => d.properties.cluster),
            data: clusters,
            getPosition: d => [+d.geometry.coordinates[0], +d.geometry.coordinates[1]],
            getText,
            getSize: 10,
            // getLineColor: [0, 0, 0],
            getColor: [0, 0, 0],
            // getColor: [0, 0, 0],
            getTextAnchor: 'middle',
            getAlignmentBaseline: 'center',
            fontWeight: 'bold',
          })
        ]
      )
    })

    setClustersLayersGroup(clusterLayersGroup);
  }, [clustersGroup])

  // const tagPointLayer = new ScatterplotLayer({
  //   id: 'scatterplot-layer22',
  //   data: tagFilteredAreas,
  //   // pickable: true,
  //   // opacity: 0.6,
  //   // stroked: true,
  //   // filled: true,
  //   radiusScale: 10,
  //   // radiusMinPixels: 1,
  //   // radiusMaxPixels: 120,
  //   // lineWidthMinPixels: 1,
  //   getPosition: ({ longitude, latitude }) => [+longitude, +latitude],
  //   pickable: true,
  //   // opacity: 0.8,
  //   stroked: true,
  //   filled: true,
  //   radiusScale: 100,
  //   // radiusMinPixels: 1,
  //   // radiusMaxPixels: 100,
  //   // lineWidthMinPixels: 1,
  //   // getPosition: d => d.coordinates,
  //   getRadius: d => 5,
  //   getFillColor: d => [255, 140, 0],
  //   getLineColor: d => [0, 0, 0],
  //   lineWidthScale: 1,
  //   // getRadius: d => Math.sqrt(d.exits),
  //   // getFillColor: () => {
  //   //   // getFillColor: ({ id }) => {
  //   //   let color = null;

  //   //   // if (selectedAreaData?.id === id) {
  //   //   //   color = [255, 204, 0, 105];
  //   //   // } else {
  //   //   color = [200, 200, 200, 255];
  //   //   // }

  //   //   // if (hoveredAreaId === id) {
  //   //   //   color[3] += 30;
  //   //   // }

  //   //   return color;
  //   // },
  //   // getLineColor: () => [0, 0, 0],
  //   // onHover: () => {
  //   //   // if (mode !== modes.AREA) {
  //   //   //   setHoveredAreaId(object?.id);
  //   //   // }
  //   // },
  //   // onClick: () => {
  //   //   // setSelectedAreaData(info.object);
  //   // }
  // })

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
      // console.log('onDragStart', info, event)
    },
    onDragEnd: (info, event) => {
      // console.log('onDragEnd', info, event)
    }
  });

  const iconData = areasData.filter((area) => area.logoUrl)

  const iconLayer = new IconLayer({
    id: 'icon-layer',
    data: iconData,
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

  const scatterplotSearchFilterAreaPointsLayer = new ScatterplotLayer({
    id: 'scatterplot-layer3',
    data: searchResult.map((item) => ({ ...item, notice: item.description })),
    pickable: true,
    opacity: 1,
    stroked: true,
    filled: true,
    radiusScale: 1,
    radiusMinPixels: 8,
    radiusMaxPixels: 1000,
    lineWidthMinPixels: 2,
    // getPosition: d => d,
    getPosition: ({ longitude, latitude }) => [+longitude, +latitude],
    getFillColor: [60, 150, 255],
    getLineColor: () => [255, 255, 255],
    onDragStart: (info, event) => {
      // console.log('onDragStart', info, event)
    },
    onDragEnd: (info, event) => {
      // console.log('onDragEnd', info, event)
    }
  });

  const scatterplotSearchHoveredFilterAreaPointsLayer = new ScatterplotLayer({
    id: 'scatterplot-layer4',
    data: searchHoveredAreaId && [searchResult.find(({ id }) => (id === searchHoveredAreaId))],
    pickable: true,
    opacity: 1,
    stroked: true,
    filled: true,
    radiusScale: 1,
    radiusMinPixels: 8,
    radiusMaxPixels: 1000,
    lineWidthMinPixels: 2,
    // getPosition: d => d,
    getPosition: ({ longitude, latitude }) => [+longitude, +latitude],
    getFillColor: [255, 204, 0, 205],
    getLineColor: () => [255, 255, 255],
    onDragStart: (info, event) => {
      // console.log('onDragStart', info, event)
    },
    onDragEnd: (info, event) => {
      // console.log('onDragEnd', info, event)
    }
  });

  // TODO: Add disable button
  // const heatmapLayer = new HeatmapLayer({
  //   id: 'HeatmapLayer',
  //   data: searchResult.map((item) => ({ ...item, notice: item.description })),

  //   aggregation: 'SUM',
  //   getPosition: ({ longitude, latitude }) => [+longitude, +latitude],
  //   radiusPixels: 25
  // });

  const onMapClick = (event) => {
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
  }

  const initialViewState = {
    longitude: longitude || 27.878700,
    latitude: latitude || 53.868718,
    zoom: zoom || 6.4,
    pitch: 0,
    bearing: 0
  }

  // console.log('selectedAreaData', selectedAreaData)
  
  const layers = [
    // pointsLayer,
    // contourAreasLayer,
    areaShow ? areasLayer : null,
    selectedAreaData ? selectedAreasLayer : null,
    polygonNewAreaPointsLayer,
    scatterplotNewAreaPointsLayer,
    iconShow ? iconLayer : null,
    titleShow ? tagsLayer : null,
    titleShow ? titleLayer : null,
    scatterplotSearchFilterAreaPointsLayer,
    scatterplotSearchHoveredFilterAreaPointsLayer,
    clusterShow ? clustersLayersGroup : null,
    // clusterShow ? clusterLayer : null,
    // clusterShow ? clusterTextLayer : null,
    // heatmapLayer,
    // tagPointLayer
  ]

  const controller = { dragPan: true }

  const getTooltip = ({object}) => object && `${object.number ?? '-'}\n${object.notice?.match(/.{1,50}/g)?.join('\n') ?? '-'}`

  const style = { zIndex: '1', overflow: 'hidden' }

  const onViewStateChange = ({ viewState: { zoom, longitude, latitude, width, height } }) => {
    // console.log(viewState)

    const viewport = new WebMercatorViewport({
      longitude,
      latitude,
      zoom,
      width,
      height,
    });
    const bounds = viewport.getBounds()

    setZoom(zoom)
    setLatitude(latitude)
    setLongitude(longitude)
    setBounds(bounds)

    jsCookie.set('_map_location', `${latitude}|${longitude}|${zoom}`)
    {/*setHoveredAreaId(null);*/}
    {/*refreshAreas();*/}
  }

  const getCursor = ({ isDragging }) => (isDragging ? 'grabbing' : (hoveredAreaId ? 'pointer' : 'grab'))

  return (
    <DeckGL
      onClick={onMapClick}
      initialViewState={initialViewState}
      layers={layers}
      controller={controller}
      getTooltip={getTooltip}
      style={style}
      onViewStateChange={onViewStateChange}
      getCursor={getCursor}
    >
      {
        mapStyle == 'satellite' ? (
          <StaticMap
            mapStyle={"mapbox://styles/mapbox/satellite-v9"}
            mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
          />
        ) : (
          <StaticMap mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}/>
        )
      }
    </DeckGL>
  )
}

export default connect(
  (state) => ({
    latitude: state.main.latitude,
    longitude: state.main.longitude,
    zoom: state.main.zoom,
    mode: state.main.mode,
    tags: state.main.tags,
    longitude: state.main.longitude,
    latitude: state.main.latitude,
    areasData: state.main.areasData,
    pointsData: state.main.pointsData,
    selectedAreaData: state.main.selectedAreaData,
    hoveredAreaId: state.main.hoveredAreaId,
    searchHoveredAreaId: state.main.searchHoveredAreaId,
    newAreaPoints: state.modes.area.newAreaPoints,
    searchResult: state.main.searchResult,
    selectedTags: state.main.selectedTags,
    mapStyle: state.main.mapStyle,
    titleShow: state.main.titleShow,
    iconShow: state.main.iconShow,
    clusterShow: state.main.clusterShow,
    clusterShowValue: state.main.clusterShowValue,
    areaShow: state.main.areaShow,
  }),
  (dispatch) => ({
    setLatitude: (latitude) => dispatch(setLatitude(latitude)),
    setLongitude: (longitude) => dispatch(setLongitude(longitude)),
    setZoom: (zoom) => dispatch(setZoom(zoom)),
    setSelectedAreaData: (data) => dispatch(setSelectedAreaData(data)),
    setHoveredAreaId: (id) => dispatch(setHoveredAreaId(id)),
    addNewAreaPointForAreaMode: (coordinates) => dispatch(addNewAreaPointForAreaMode(coordinates)),
    addPoint: (coordinates) => dispatch(addPoint(coordinates)),
  })
)(Map)
