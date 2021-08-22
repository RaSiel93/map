import React, { useState, useEffect } from 'react';
import { Modal } from './Modal';

export const EditAreaModal = (props) => {
  const { isOpen, item, onClose, onRemove, onSubmit, areas } = props;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [areaId, setAreaId] = useState(null);
  const [peopleCount, setPeopleCount] = useState(null);

  const onAfterOpen = () => {
    setTitle(item.number || '');
    setDescription(item.notice || '');
    setAreaId(item.areaId || '');
    setPeopleCount(item.peopleCount || '');
  }

  const handleSubmit = () => {
    onSubmit({ id: item.id, title, description, area_id: areaId, people_count: peopleCount });
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
        id='title'
        value={title}
        placeholder='Назва'
        onChange={(e) => { setTitle(e.target.value) }}
      ></input>
    </div>
    <div>
      <textarea
        id='description'
        value={description}
        onChange={(e) => { setDescription(e.target.value) }}
        placeholder='Апісанне'
        cols='50'
        rows='10'
      ></textarea>
    </div>
    <div>
      <select
        name='areaId'
        value={areaId || ''}
        onChange={(e) => { setAreaId(e.target.value) }}
      >
        <option value=''>Знаходзіцца ў</option>
        {
          areas.map((area) => {
            return <option key={area.id} value={area.id}>{area.number}</option>
          })
        }
      </select>
    </div>
    <div>
      <input
        id='peopleCount'
        type='number'
        min={0}
        value={peopleCount}
        placeholder='Колькасць жыхароў'
        onChange={(e) => { setPeopleCount(e.target.value) }}
      ></input>
    </div>
    {/*<button onClick={handleRemove}>Выдаліць</button>*/}
    <button onClick={handleSubmit}>Прыняць</button>
  </Modal>
}
