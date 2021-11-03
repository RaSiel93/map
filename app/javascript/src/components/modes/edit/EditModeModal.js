import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { SpinnerCircular } from 'spinners-react';
import { connect } from 'react-redux';

import { Modal } from 'src/components/common/Modal';
import { modes } from 'src/constants';
import { getArea, removeArea, updateArea } from 'src/api';
import {
  toggleMode,
  removeAreaData,
  updateAreaData,
  setSelectedAreaData
} from 'src/store/actions';
import { areaToPolygonObject } from 'src/services/deckGl';

const ENTER_KEY = 'Enter';

const EditModeModal = (props) => {
  const {
    id,
    mode,
    areasData,
    toggleMode,
    updateAreaData,
    removeAreaData,
    setSelectedAreaData,
  } = props;

  const [area, setArea] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [areaId, setAreaId] = useState(null);
  const [peopleCount, setPeopleCount] = useState(null);
  const [areaOptions, setAreaOptions] = useState([]);

  useEffect(() => {
    setAreaOptions([
      { value: '', label: 'Знаходзіцца ў' },
      ...areasData.map(areaData => (
        { value: areaData.id, label: areaData.number }
      ))
    ]);
  }, []);

  const onRequestClose = () => {
    toggleMode(modes.EDIT);
  };

  useEffect(async () => {
    const area = await getArea(id);
    const { attributes: { title, description, area_id, people_count }} = area;

    setArea(area);

    setTitle(title);
    setDescription(description);
    setAreaId(area_id);
    setPeopleCount(people_count);
  }, [id]);

  const handleUpdateArea = async () => {
    const params = {
      area: {
        title,
        description,
        area_id: areaId,
        people_count: peopleCount,
      }
    };
    const token = document.querySelector('[name=csrf-token]').content;

    const area = await updateArea(id, params, token);

    updateAreaData(areaToPolygonObject(area));
    toggleMode(modes.EDIT);
  };

  const handleRemoveArea = async () => {
    if (confirm("Вы ўпэўнены, што жадаеце выдаліць аб'ект?")) {
      const token = document.querySelector('[name=csrf-token]').content;

      await removeArea(id, token);

      removeAreaData(id);
      setSelectedAreaData(null);
      toggleMode(modes.EDIT);
    }
  };

  if (area) {
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
          onKeyDown={({ key }) => (key === ENTER_KEY) && handleUpdateArea()}
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
          onKeyDown={({ key }) => (key === ENTER_KEY) && handleUpdateArea()}
        ></input>
      </div>
      <button onClick={handleRemoveArea}>Выдаліць</button>
      <button onClick={handleUpdateArea}>
        Прыняць
      </button>
    </Modal>
  } else {
    return <Modal
      isOpen={mode === modes.EDIT}
      onRequestClose={onRequestClose}
      contentLabel='Рэдагаванне тэрыторыі'
    >
      <SpinnerCircular size={50} thickness={180} speed={280} color="rgba(0, 0, 0, 1)" secondaryColor="rgba(255, 255, 255, 1)" />
    </Modal>
  }
}

EditModeModal.propTypes = {
  id: PropTypes.number,
  mode: PropTypes.string,
  areasData: PropTypes.array,
  setSelectedAreaData: PropTypes.array,
  toggleMode: PropTypes.func,
  updateAreaData: PropTypes.func,
  removeAreaData: PropTypes.func,
}

export default connect(
  (state) => ({
    mode: state.main.mode,
    id: state.main.selectedAreaData.id,
    areasData: state.main.areasData,
  }),
  {
    toggleMode,
    updateAreaData,
    removeAreaData,
    setSelectedAreaData,
  }
)(EditModeModal);
