import React, { useState, useEffect } from 'react';
import { Modal } from './Modal';

export const EditAreaModal = (props) => {
  const { isOpen, item, onClose, onRemove, onSubmit } = props;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const onAfterOpen = () => {
    setTitle(item.number || '');
    setDescription(item.notice || '');
  }

  const handleSubmit = () => {
    onSubmit({ id: item.id, title, description });
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
      <label htmlFor='title'>Назва</label>
      <input
        id='title'
        value={title}
        onChange={(e) => { setTitle(e.target.value) }}
      ></input>
    </div>
    <div>
      <label htmlFor='description'>Апісанне</label>
      <textarea
        id='description'
        value={description}
        onChange={(e) => { setDescription(e.target.value) }}
        cols='50'
        rows='10'
      ></textarea>
    </div>
    <button onClick={handleRemove}>Выдаліць</button>
    <button onClick={handleSubmit}>Прыняць</button>
  </Modal>
}
