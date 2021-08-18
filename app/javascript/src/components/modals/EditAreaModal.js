import React, { useState, useEffect } from 'react';
import { Modal } from './Modal';

export const EditAreaModal = (props) => {
  const { isOpen, item, onClose, onRemove, onSubmit, areas } = props;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [areaId, setAreaId] = useState(null);

  const onAfterOpen = () => {
    setTitle(item.number || '');
    setDescription(item.notice || '');
    setAreaId(item.areaId || '');
  }

  const handleSubmit = () => {
    onSubmit({ id: item.id, title, description, area_id: areaId });
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
    <div>
      <label htmlFor='areaId'>Знаходзіцца ў</label>
      <select
        name='areaId'
        value={areaId || ''}
        onChange={(e) => { setAreaId(e.target.value) }}
      >
        <option value=''></option>
        {
          areas.map((area) => {
            return <option key={area.id} value={area.id}>{area.number}</option>
          })
        }
      </select>
    </div>
    {/*<button onClick={handleRemove}>Выдаліць</button>*/}
    <button onClick={handleSubmit}>Прыняць</button>
  </Modal>
}
