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

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    display               : 'flex',
    flexDirection         : 'column',
    gap                   : '20px'
  }
}

const ReactModalAdapter = ({ className, modalClassName, ...props }) => {
  return (
    <ReactModal
      className={modalClassName}
      portalClassName={className}
      bodyOpenClassName="portalOpen"
      {...props}
    />
  );
}

const StyledReactModal = styled(ReactModalAdapter)`
  label {
    text-align: center;
  }

  label, input, button {
    font-size: 20px;
  }

  div {
    display: flex;
    flex-direction: column;
  }
`

// const MAPBOX_ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;


// Viewport settings
// const INITIAL_VIEW_STATE = {
//   longitude: 27.478700,
//   latitude: 53.868718,
//   zoom: 16.0,
//   minZoom: 15,
//   maxZoom: 19,
//   pitch: 0,
//   bearing: 0
// };

// // Data to be used by the LineLayer
// const data = [
//   {sourcePosition: [-122.41669, 37.7853], targetPosition: [-122.41669, 37.781]}
// ];

// function App({data}) {
//   const layers = [
//     new LineLayer({id: 'line-layer', data})
//   ];

//   return (
//     <DeckGL
//       initialViewState={INITIAL_VIEW_STATE}
//       controller={true}
//       layers={layers}
//     >
//       <StaticMap mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN} />
//     </DeckGL>
//   );
// }


// data needed for overlay here
// const data = [{
//  name: "random-name",
//  color: [101, 147, 245],
//  path:[[27.4787, 53.8697],
//        [27.4797, 53.8687]]}
// ]

  //  new PathLayer({
  //   id: "path-layer",
  //   data,
  //   getWidth: data => 10,
  //   getColor: data => data.color,
  //   widthMinPixels: 7
  // }),
  // new TerrainLayer({
  //   elevationDecoder: {
  //     rScaler: 2,
  //     gScaler: 0,
  //     bScaler: 0,
  //     offset: 0
  //   },
  //   // Digital elevation model from https://www.usgs.gov/
  //   elevationData: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/terrain.png',
  //   texture: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/terrain-mask.png',
  //   bounds: [27.476170, 53.871621, 27.482626, 53.865497],
  // })

const App = () => {
  const numberRef = useRef(null)
  const noticeRef = useRef(null)

  const [data, setData] = useState([])
  const [modalOpen, setOpen] = useState(false)
  const [latitude, setLatitude] = useState(null)
  const [longitude, setLongitude] = useState(null)

  const afterOpenModal = () => {
    console.log('modal openned')
  }

  const openModal = () => {
    setOpen(true)
  }

  const closeModal = () => {
    setOpen(false)
  }

  const applyModal = () => {
    const token = document.querySelector('[name=csrf-token]').content
    const params = {
      latitude,
      longitude,
      number: numberRef.current.value,
      notice: noticeRef.current.value
    }

    axios.post('api/v1/cars.json', params,  { headers: { 'X-CSRF-TOKEN': token }})
    .then((response) => {
      const { number, notice, longitude, latitude } = response.data.data.attributes

      setData([
        ...data,
        {
          number: number,
          code: 'CM',
          notice: notice,
          exits: 5,
          coordinates: [+longitude, +latitude]
        }
      ])

      closeModal()
      setLatitude(null)
      setLongitude(null)
    })
    .catch((response) => {
      console.log(response)
    })
  }

  useEffect(() => {
    axios.get('api/v1/cars.json')
    .then((response) => {
      const cars = response.data.data.map((car) => {
        let { number, notice, longitude, latitude } = car.attributes

        return {
          number: number,
          code: 'CM',
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
  }, data.length)

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
    })
  ]

  const onClick = (event) => {
    const [longitude, latitude] = event.coordinate

    setLatitude(latitude)
    setLongitude(longitude)

    openModal()
  }

  return (
    <div>
      <StyledReactModal
        isOpen={modalOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div>
          <label for="number">Нумар</label>
          <input id="number" ref={numberRef}></input>
        </div>
        <div>
          <label for="notice">Заметка</label>
          <input id="notice" ref={noticeRef}></input>
        </div>
        <button onClick={applyModal}>Прыняць</button>
      </StyledReactModal>
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
        controller={true}
        layers={layers}
        getTooltip={({object}) => object && `${object.number}\n${object.notice}`}
      >
        <StaticMap
          mapStyle="mapbox://styles/mapbox/satellite-v9"
          mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
        />
      </DeckGL>
    </div>
  )
}

export default App;

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
