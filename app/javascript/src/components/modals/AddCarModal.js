import React, { useState, useEffect } from 'react';
import { Modal } from './Modal';

export const AddCarModal = (props) => {
  const { isOpen, onClose, onSubmit } = props;

  const [number, setNumber] = useState('');
  const [notice, setNotice] = useState('');

  const onAfterOpen = () => {
    setNumber('');
    setNotice('');
  }

  const handleSubmit = () => {
    onSubmit({ number, notice });
  }

  return <Modal
    isOpen={isOpen}
    onAfterOpen={onAfterOpen}
    onRequestClose={onClose}
    contentLabel='Дабаўленне машыны'
  >
    <div>
      <label htmlFor='number'>Нумар</label>
      <input
        id='number'
        value={number}
        onChange={(e) => { setNumber(e.target.value) }}
      ></input>
    </div>
    <div>
      <label htmlFor='notice'>Нататка</label>
      <input
        id='notice'
        value={notice}
        onChange={(e) => { setNotice(e.target.value) }}
      ></input>
    </div>
    <button onClick={handleSubmit}>Прыняць</button>
  </Modal>
}