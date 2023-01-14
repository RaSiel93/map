import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { SpinnerCircular } from 'spinners-react';
import { connect } from 'react-redux';

import { Modal } from 'components/common/Modal';
import { modes } from 'constants';
import { getArea, removeArea, updateArea } from 'api';
import {
  toggleMode,
  removeAreaData,
  updateAreaData,
  setSelectedAreaData
} from 'store/actions';
import { areaToPolygonObject } from 'services/deckGl';

const ENTER_KEY = 'Enter';

const EditModeModal = (props) => {
  const {
    id,
    mode,
    areasData,
    companies,
    toggleMode,
    updateAreaData,
    removeAreaData,
    setSelectedAreaData,
  } = props;

  const [area, setArea] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [areaId, setAreaId] = useState(null);
  const [companyId, setCompanyId] = useState(null);
  const [peopleCount, setPeopleCount] = useState(null);
  const [areaOptions, setAreaOptions] = useState([]);
  const [companyOptions, setCompanyOptions] = useState([]);
  const [startAt, setStartAt] = useState(null);
  const [endAt, setEndAt] = useState(null);

  useEffect(() => {
    setAreaOptions([
      { value: '', label: 'Знаходзіцца ў' },
      ...areasData.map(areaData => (
        { value: areaData.id, label: areaData.number }
      ))
    ]);
    setCompanyOptions([
      { value: '', label: 'Знаходзіцца кампанія' },
      ...companies.map(company => (
        { value: +company.id, label: company.attributes.name }
      ))
    ]);
  }, []);

  const onRequestClose = () => {
    toggleMode(modes.EDIT);
  };

  useEffect(async () => {
    const area = await getArea(id);
    const { attributes: { title, description, area_id, people_count, company_id, start_at, end_at }} = area;

    setArea(area);

    setTitle(title);
    setDescription(description);
    setAreaId(area_id);
    setCompanyId(company_id);
    setPeopleCount(people_count);
    setStartAt(start_at);
    setEndAt(end_at);
  }, [id]);

  const handleUpdateArea = async () => {
    const params = {
      area: {
        title,
        description,
        area_id: areaId,
        company_id: companyId,
        people_count: peopleCount,
        start_at: startAt,
        end_at: endAt,
      }
    };
    const area = await updateArea(id, params);

    updateAreaData(areaToPolygonObject(area));
    toggleMode(modes.EDIT);
  };

  const handleRemoveArea = async () => {
    if (window.confirm("Вы ўпэўнены, што жадаеце выдаліць аб'ект?")) {
      await removeArea(id);

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
        <Select
          name='companyId'
          value={companyOptions.find(option => (option.value === companyId))}
          onChange={option => setCompanyId(option.value)}
          options={companyOptions}
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
      <div>
        <input
          id='startAt'
          type='date'
          value={startAt ? (new Date(startAt)).toISOString().split('T')[0] : ''}
          placeholder='Дата пачатку'
          onChange={(e) => { setStartAt(e.target.value) }}
          onKeyDown={({ key }) => (key === ENTER_KEY) && handleUpdateArea()}
        ></input>
      </div>
      <div>
        <input
          id='endAt'
          type='date'
          value={endAt ? (new Date(endAt)).toISOString().split('T')[0] : ''}
          placeholder='Дата сканчэньня'
          onChange={(e) => { setEndAt(e.target.value) }}
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
  companies: PropTypes.array,
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
    companies: state.main.companies,
  }),
  {
    toggleMode,
    updateAreaData,
    removeAreaData,
    setSelectedAreaData,
  }
)(EditModeModal);
