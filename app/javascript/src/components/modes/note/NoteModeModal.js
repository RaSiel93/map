import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'src/components/common/Modal';
import { modes } from 'src/constants';

import { toggleMode } from 'src/store/actions';
import { createNoteForNoteMode } from 'src/store/thunks';

const NoteModeModal = (props) => {
  const {
    mode,
    selectedAreaData,
    // createNote,
    toggleMode,
    createNoteForNoteMode,
  } = props;

  const [text, setText] = useState('');

  const onAfterOpen = () => {
    setText('');
  }

  const onRequestClose = () => {
    toggleMode(modes.NOTE);
  }

  const onCreate = () => {
    const params = {
      note: { text, area_id: selectedAreaData.id }
    };
    const token = document.querySelector('[name=csrf-token]').content;

    createNoteForNoteMode(params, token);
  }

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

export default connect(
  (state) => ({
    mode: state.main.mode,
    selectedAreaData: state.main.selectedAreaData,
  }), {
    toggleMode,
    createNoteForNoteMode,
  }
)(NoteModeModal);
