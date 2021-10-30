import React, { useState, useEffect } from 'react';
// import { getArea } from '../../api/area';
import { connect } from 'react-redux';
import Select from 'react-select';
import { SpinnerCircular } from 'spinners-react';

import { Modal } from 'src/components/common/Modal';
import { toggleMode, resetArea } from 'src/store/actions';
// import { getArea, updateArea } from 'src/store/thunks';
import { modes } from 'src/constants';

const EditModeModal = (props) => {
  // const { id, isOpen, onClose, onRemove, onSubmit, areas, toggleMode } = props;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [areaId, setAreaId] = useState(null);
  const [peopleCount, setPeopleCount] = useState(null);

  const {
    mode,
    area,
    // areas,
    // selectedAreaId,
    // toggleMode,
    // getArea,
    // areaStatus,
    // updateStatus,
    // updateArea,
    // resetArea,
  } = props;

  // useEffect(() => {
    // setArea(area)
  // }, []);

  // useEffect(() => {
  //   // switch (areaStatus) {
  //   //   case requestStatuses.IDLE: {
  //   //     getArea(selectedAreaId);
  //   //     break;
  //   //   }
  //   //   case requestStatuses.SECCEEDED: {
  //   //     const { attributes: { title, description, area_id, people_count }} = area;

  //   //     // console.log('SECCEEDED', area)

  //   //     setTitle(title);
  //   //     setDescription(description);
  //   //     setAreaId(area_id);
  //   //     setPeopleCount(people_count);
  //   //     break;
  //   //   }
  //   // }
  // }, [areaStatus]);

  // useEffect(() => {
  //   // if (updateStatus === requestStatuses.UPDATED) {
  //   //   toggleMode(modes.EDIT);
  //   //   resetArea();
  //   // }
  // }, [updateStatus]);

  const onRequestClose = () => {
    toggleMode(modes.EDIT);
  }

  // useEffect(() => {
    // const area = await getArea(id);
    // const { attributes: { title, description, area_id, people_count }} = area;

    // setArea(area);

    // setTitle(title);
    // setDescription(description);
    // setAreaId(area_id);
    // setPeopleCount(people_count);
    // getArea
  // }, [id]);

  const onUpdate = () => {
    const params = {
      area: {
        title,
        description,
        area_id: areaId,
        people_count: peopleCount,
      }
    };
    const token = document.querySelector('[name=csrf-token]').content;

    updateArea(selectedAreaId, params, token);
  }

  // const handleSubmit = () => {
  //   onSubmit({
  //     id,
  //     title,
  //     description,
  //     area_id: areaId,
  //     people_count: peopleCount,
  //   });
  // }

  // const handleRemove = () => {
  //   onRemove({ id });
  // }

  if (area) {
    // const [area, setArea] = useState(null);

    const areaOptions = [
      { value: '', label: 'Знаходзіцца ў' },
      ...areas.map(area => ({ value: area.id, label: area.attributes.title }))
    ];

    return <Modal
      isOpen={mode === modes.EDIT}
      onRequestClose={onRequestClose}
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
      <button onClick={onUpdate}>Прыняць</button>
    </Modal>
  } else {
    return <Modal isOpen >
      <SpinnerCircular size={50} thickness={180} speed={280} color="rgba(0, 0, 0, 1)" secondaryColor="rgba(255, 255, 255, 1)" />
    </Modal>
  }
}

export default connect(
  (state) => ({
    mode: state.main.mode,
    area: state.modes.edit.area,
    // areas: state.areas.areas,
    // areaStatus: state.areas.getStatus,
    // updateStatus: state.areas.updateStatus,
    // selectedAreaId: state.modes.selectedAreaId,
  }),
  {
    toggleMode,
    // getArea,
    // updateArea,
    // resetArea,
  }
)(EditModeModal);
