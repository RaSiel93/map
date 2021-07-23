import React, { useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'

const Button = styled.button`
  position: absolute;
  right: 80px;
  width: 50px;
  height: 50px;
  background-color: #222;
  border: none;
  border-radius: 50%;
  z-index: 10;

  &:after {
    color: #aaa;
  }

  &:hover {
    background-color: #333;
    color: #ccc;
    cursor: pointer;
  }
`

const ModeButton = styled(Button)`
  bottom: 20px;

  &:after {
    font-size: 30px;
    content: '#';
  }
`

const SaveButton = styled(Button)`
  bottom: 80px;

  &:after {
    content: 'save';
  }
`

export const AddAreaButton = (props) => {
  const { mode, setMode, areas, setAreas, areaData, setAreaData } = props;

  const toogleAreaMode = () => {
    if (mode === 'area') {
      setAreaData([]);
      setMode(null);
    } else {
      setMode('area');
    }
  }

  const onSave = () => {
    const token = document.querySelector('[name=csrf-token]').content
    const params = {
      area: {
        coordinates: areaData.map(data => JSON.stringify(data.coordinates))
      }
    }

    axios.post('api/v1/areas.json', params,  { headers: { 'X-CSRF-TOKEN': token }})
    .then((response) => {

      const { id, coordinates } = response.data.data.attributes

      setAreas([
        ...areas,
        {
          id: id,
          contour: coordinates.map(coordinate => JSON.parse(coordinate))
        }
      ])

      setAreaData([])
      setMode(null)
    })
    .catch((response) => {
      console.log(response)
    })
  }

  return <>
    <ModeButton onClick={toogleAreaMode}/>
    { mode === 'area' && <SaveButton onClick={onSave}/> }
  </>
}
