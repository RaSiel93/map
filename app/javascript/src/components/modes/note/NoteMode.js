import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Button } from 'src/components/common/Button';
import { modes } from 'src/constants';
import NoteModeModal from './NoteModeModal';

import { toggleMode } from 'src/store/actions';

const ModeButton = styled(Button)`
  bottom: 20px;
  right: 20px;

  &:after {
    font-size: 30px;
    content: '+';
  }
`

const NoteMode = (props) => {
  const {
    mode,
    toggleMode,
  } = props;

  const active = mode === modes.NOTE;

  const onClick = () => {
    toggleMode(modes.NOTE);
  };

  return <>
    <ModeButton onClick={onClick} className={active ? 'active' : ''}/>
    {
      active && <NoteModeModal
        isOpen={active}
      />
    }
  </>
}

export default connect(
  (state) => ({
    mode: state.main.mode,
  }), {
    toggleMode,
  }
)(NoteMode);
