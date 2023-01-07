import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal } from 'components/common/Modal';
import { modes } from 'constants';

import { toggleMode } from 'store/actions';
import { createNote } from 'api';

const NoteModeModal = (props) => {
  const {
    mode,
    toggleMode,
    selectedAreaData,
  } = props;

  const [text, setText] = useState('');

  const onAfterOpen = () => {
    setText('');
  };

  const onRequestClose = () => {
    toggleMode(modes.NOTE);
  };

  const onCreate = async () => {
    const params = {
      note: { text, area_id: selectedAreaData?.id }
    };

    await createNote(params);

    toggleMode(modes.NOTE);
  };

  return <Modal
    isOpen={mode === modes.NOTE}
    onAfterOpen={onAfterOpen}
    onRequestClose={onRequestClose}
    contentLabel='Дабаўленне нататкі'
  >
    <div>
      <textarea
        id='text'
        value={text}
        placeholder='Тэкст'
        onChange={(e) => { setText(e.target.value) }}
        cols='50'
        rows='10'
      ></textarea>
    </div>
    <button onClick={onCreate}>Прыняць</button>
  </Modal>
}

NoteModeModal.propTypes = {
  mode: PropTypes.string,
  toggleMode: PropTypes.func,
  selectedAreaData: PropTypes.array,
}

export default connect(
  (state) => ({
    mode: state.main.mode,
    selectedAreaData: state.main.selectedAreaData,
  }), {
    toggleMode,
  }
)(NoteModeModal);
