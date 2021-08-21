import React, { useState, useEffect } from 'react';
import { Modal } from './Modal';

export const EditCarModal = (props) => {
  const { isOpen, item, onClose, onRemove, onSubmit } = props;

  const [number, setNumber] = useState('');
  const [notice, setNotice] = useState('');

  const onAfterOpen = () => {
    setNumber(item.number);
    setNotice(item.notice);
  }

  const handleSubmit = () => {
    onSubmit({ id: item.id, number, notice });
  }

  const handleRemove = () => {
    onRemove({ id: item.id });
  }

  return <Modal
    isOpen={isOpen}
    onAfterOpen={onAfterOpen}
    onRequestClose={onClose}
    contentLabel='Рэдагаванне машыны'
  >
    <div>
      <input
        id='number'
        value={number}
        placeholder='Нумар'
        onChange={(e) => { setNumber(e.target.value) }}
      ></input>
    </div>
    <div>
      <input
        id='notice'
        value={notice}
        placeholder='Нататка'
        onChange={(e) => { setNotice(e.target.value) }}
      ></input>
    </div>
    <button onClick={handleRemove}>Выдаліць</button>
    <button onClick={handleSubmit}>Прыняць</button>
  </Modal>
}
