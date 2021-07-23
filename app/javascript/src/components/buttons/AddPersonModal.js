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
        backgroundColor: '#0005',
        zIndex: '100'
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

export const AddPersonModal = (props) => {
  const [notice, setNotice] = useState(null)

  const applyModal = () => {
    const token = document.querySelector('[name=csrf-token]').content
    const params = {
      person: { notice }
    }

    axios.post('api/v1/people.json', params,  { headers: { 'X-CSRF-TOKEN': token }})
    .then((response) => {
      props.onRequestClose()
      setNotice(null)
    })
    .catch((response) => {
      console.log(response)
    })
  }

  return <StyledReactModal
    isOpen={props.isOpen}
    onAfterOpen={props.onAfterOpen}
    onRequestClose={props.onRequestClose}
    style={customStyles}
    contentLabel="Дадаць чалавека"
  >
    <div>
      <label for="notice">Нататка</label>
      <textarea
        id="notice"
        value={notice}
        onChange={(e) => { setNotice(e.target.value) }}
        cols="50"
        rows="10"
      ></textarea>
    </div>
    <button onClick={applyModal}>Прыняць</button>
  </StyledReactModal>
}
