import React, { useState, useEffect } from 'react';
import { Modal } from './Modal';

export const AddPersonModal = (props) => {
  const { isOpen, onClose, onSubmit, item } = props;

  const [notice, setNotice] = useState('');

  const onAfterOpen = () => {
    setNotice('');
  }

  const handleSubmit = () => {
    onSubmit({ notice, area_id: item.id });
  }

  return <Modal
    isOpen={isOpen}
    onAfterOpen={onAfterOpen}
    onRequestClose={onClose}
    contentLabel='Дабаўленне чалавека'
  >
    <div>
      <label htmlFor='notice'>Нататка</label>
      <textarea
        id='notice'
        value={notice}
        onChange={(e) => { setNotice(e.target.value) }}
        cols='50'
        rows='10'
      ></textarea>
    </div>
    <button onClick={handleSubmit}>Прыняць</button>
  </Modal>
}
