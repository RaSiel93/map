import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Button } from 'components/common/Button';
import { modes } from 'constants';
import NoteModeModal from './NoteModeModal';

import { toggleMode } from 'store/actions';

const ModeButton = styled(Button)`
  // bottom: 20px;
  // right: 20px;

  &:after {
    // font-size: 30px;
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

NoteMode.propTypes = {
  mode: PropTypes.string,
  toggleMode: PropTypes.func,
}

export default connect(
  (state) => ({
    mode: state.main.mode,
  }), {
    toggleMode,
  }
)(NoteMode);
