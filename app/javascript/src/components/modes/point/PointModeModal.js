import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Modal } from 'src/components/common/Modal';
import { createPoint } from 'src/api';
import { resetPoint, addPointData } from 'src/store/actions';
import { pointToScatterplotObject } from 'src/services/deckGl';

const ENTER_KEY = 'Enter';

const PointModeModal = (props) => {
  const {
    pointCoordinates,
    resetPoint,
    addPointData,
  } = props;

  const [number, setNumber] = useState('');
  const [notice, setNotice] = useState('');

  useEffect(() => {
    setNumber('');
    setNotice('');
  }, []);

  const handleCreatePoint = async () => {
    const [longitude, latitude] = pointCoordinates;
    const params = { car: { longitude, latitude, number, notice }};
    const token = document.querySelector('[name=csrf-token]').content;

    const point = await createPoint(params, token);

    addPointData(pointToScatterplotObject(point));
    resetPoint();
  };

  const onRequestClose = () => {
    resetPoint();
  };

  return <Modal
    isOpen={pointCoordinates !== null}
    onRequestClose={onRequestClose}
    contentLabel='Дабаўленне машыны'
  >
    <div>
      <input
        id='number'
        value={number}
        placeholder='Нумар'
        onChange={(e) => { setNumber(e.target.value) }}
        onKeyDown={({ key }) => (key === ENTER_KEY) && handleCreatePoint()}
      ></input>
    </div>
    <div>
      <input
        id='notice'
        value={notice}
        placeholder='Нататка'
        onChange={(e) => { setNotice(e.target.value) }}
        onKeyDown={({ key }) => (key === ENTER_KEY) && handleCreatePoint()}
      ></input>
    </div>
    <button onClick={handleCreatePoint}>Прыняць</button>
  </Modal>
}

PointModeModal.propTypes = {
  pointCoordinates: PropTypes.array,
  resetPoint: PropTypes.func,
  addPointData: PropTypes.func,
}

export default connect(
  (state) => ({
    pointCoordinates: state.main.pointCoordinates,
  }),
  {
    resetPoint,
    addPointData,
  }
)(PointModeModal);
