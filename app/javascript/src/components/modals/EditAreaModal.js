import React, { useState, useEffect } from 'react';
import { Modal } from './Modal';
import { getArea } from '../../api/area';
import Select from 'react-select';
import { SpinnerCircular } from 'spinners-react';

export const EditAreaModal = (props) => {
  const { id, isOpen, onClose, onRemove, onSubmit, areas } = props;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [areaId, setAreaId] = useState(null);
  const [peopleCount, setPeopleCount] = useState(null);
  const [area, setArea] = useState(null);

  useEffect(async () => {
    const area = await getArea(id);
    const { attributes: { title, description, area_id, people_count }} = area;

    setArea(area);

    setTitle(title);
    setDescription(description);
    setAreaId(area_id);
    setPeopleCount(people_count);
  }, [id]);

  const handleSubmit = () => {
    onSubmit({
      id,
      title,
      description,
      area_id: areaId,
      people_count: peopleCount,
    });
  }

  const handleRemove = () => {
    onRemove({ id });
  }

  if (area) {
    const areaOptions = [
      { value: '', label: 'Знаходзіцца ў' },
      ...areas.map(area => ({ value: area.id, label: area.number }))
    ];

    return <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel='Рэдагаванне тэрыторыі'
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
          value={description || ''}
          onChange={(e) => { setDescription(e.target.value) }}
          placeholder='Апісанне'
          cols='50'
          rows='10'
        ></textarea>
      </div>
      <div>
        <Select
          name='areaId'
          value={areaOptions.find(option => (option.value === areaId))}
          onChange={option => setAreaId(option.value)}
          options={areaOptions}
        />
      </div>
      <div>
        <input
          id='peopleCount'
          type='number'
          min={0}
          value={peopleCount || ''}
          placeholder='Колькасць жыхароў'
          onChange={(e) => { setPeopleCount(e.target.value) }}
        ></input>
      </div>
      {/*<button onClick={handleRemove}>Выдаліць</button>*/}
      <button onClick={handleSubmit}>Прыняць</button>
    </Modal>
  } else {
    return <Modal isOpen >
      <SpinnerCircular size={50} thickness={180} speed={280} color="rgba(0, 0, 0, 1)" secondaryColor="rgba(255, 255, 255, 1)" />
    </Modal>
  }
}
