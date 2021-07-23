import React, { useState } from 'react'
import styled from 'styled-components'

const Button = styled.button`
  position: absolute;
  bottom: 20px;
  right: 80px;
  width: 50px;
  height: 50px;
  background-color: #222;
  border: none;
  border-radius: 50%;
  z-index: 10;

  &:after {
    content: '#';
    font-size: 30px;
    color: #aaa;
  }

  &:hover {
    background-color: #333;
    color: #ccc;
    cursor: pointer;
  }
`

export const AddAreaButton = (props) => {
  const { mode, setMode } = props;

  const toogleAreaMode = () => {
    if (mode === 'area') {
      setMode(null);
    } else {
      setMode('area');
    }
  }

  return <>
    <Button onClick={toogleAreaMode}/>
  </>
}
