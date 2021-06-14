import React, { Fragment, useState } from 'react'
import styled from 'styled-components'
import { AddPersonModal } from './AddPersonModal'

const Button = styled.button`
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  background-color: #222;
  border: none;
  border-radius: 50%;

  &:after {
    content: '+';
    font-size: 30px;
    color: #aaa;
  }

  &:hover {
    background-color: #333;
    color: #ccc;
    cursor: pointer;
  }
`

export const AddPersonButton = () => {
  const [modalAddPerson, setModalAddPerson] = useState(false)

  const openAddPersonModal = () => {
    setModalAddPerson(true)
  }

  const closeAddPersonModal = () => {
    setModalAddPerson(false)
  }

  return <Fragment>
    <AddPersonModal
      isOpen={modalAddPerson}
      onRequestClose={closeAddPersonModal}
    />
    <Button onClick={openAddPersonModal}/>
  </Fragment>
}
