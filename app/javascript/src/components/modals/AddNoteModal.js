import React, { useState, useEffect } from 'react';
import { Modal } from './Modal';

export const AddNoteModal = (props) => {
  const { isOpen, onClose, onSubmit, item } = props;

  const [text, setText] = useState('');

  const onAfterOpen = () => {
    setText('');
  }

  const handleSubmit = () => {
    onSubmit({ text, area_id: item?.id });
  }

  return <Modal
    isOpen={isOpen}
    onAfterOpen={onAfterOpen}
    onRequestClose={onClose}
    contentLabel='Дабаўленне нататкі'
  >
    <div>
      <label htmlFor='text'>Тэкст</label>
      <textarea
        id='text'
        value={text}
        onChange={(e) => { setText(e.target.value) }}
        cols='50'
        rows='10'
      ></textarea>
    </div>
    <button onClick={handleSubmit}>Прыняць</button>
  </Modal>
}
