import React, { useState, useEffect } from 'react'
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
  props = {
    ...props,
    style: {
      ...props['style'],
      overlay: {
        backgroundColor: '#0005'
      }
    }
  }

  return (
    <ReactModal
      className={modalClassName}
      portalClassName={className}
      bodyOpenClassName='portalOpen'
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

  .overlay {
    opacity: 0.3;
  }
`

export const EditModal = (props) => {
  const { item, setData, data } = props

  const [number, setNumber] = useState(null)
  const [notice, setNotice] = useState(null)

  const onAfterOpen = () => {
    setNumber(item.number)
    setNotice(item.notice)
  }

  const updateCar = () => {
    const token = document.querySelector('[name=csrf-token]').content
    const params = { car: { number, notice }}

    axios.put(`api/v1/cars/${item.id}.json`, params, { headers: { 'X-CSRF-TOKEN': token }})
    .then((response) => {
      const { id, number, notice, longitude, latitude } = response.data.data.attributes

      setData([
        ...data.filter((car) => { return car.id !== id }),
        {
          id: id,
          number: number,
          notice: notice,
          exits: 3,
          coordinates: [+longitude, +latitude]
        }
      ])

      props.onRequestClose()
    })
    .catch((response) => {
      console.log(response)
    })
  }

  const removeCar = () => {
    const token = document.querySelector('[name=csrf-token]').content

    axios.delete(`api/v1/cars/${item.id}.json`, { headers: { 'X-CSRF-TOKEN': token }})
    .then((response) => {
      const { id, number, notice, longitude, latitude } = response.data.data.attributes

      setData(data.filter((car) => { return car.id !== id }))

      props.onRequestClose()
    })
    .catch((response) => {
      console.log(response)
    })
  }

  return <StyledReactModal
    isOpen={props.isOpen}
    onAfterOpen={onAfterOpen}
    onRequestClose={props.onRequestClose}
    style={customStyles}
    contentLabel='Рэдагаваць машыну'
  >
    <div>
      <label for='number'>Нумар</label>
      <input
        id='number'
        value={number}
        onChange={(e) => { setNumber(e.target.value) }}
      ></input>
    </div>
    <div>
      <label for='notice'>Нататка</label>
      <input
        id='notice'
        value={notice}
        onChange={(e) => { setNotice(e.target.value) }}
      ></input>
    </div>
    <button onClick={removeCar}>Выдаліць</button>
    <button onClick={updateCar}>Прыняць</button>
  </StyledReactModal>
}
