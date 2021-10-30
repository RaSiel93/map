import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Button } from 'src/components/common/Button';

import { modes } from 'src/constants';
import { toggleMode } from 'src/store/actions';
import EditModeModal from './EditModeModal';

const ModeButton = styled(Button)`
  right: 140px;
  bottom: 20px;

  &:after {
    font-size: 30px;
    content: '/';
  }
`

const EditModeButton = (props) => {
  const {
    mode,
    toggleMode,
    selectedAreaData,
  } = props;

  const active = mode === modes.EDIT;

  const onClick = () => {
    toggleMode(modes.EDIT);
  };

  return <>
    <ModeButton onClick={onClick} className={active ? 'active' : ''}/>
    {
      active && selectedAreaData && <EditModeModal
        isOpen={active}
      />
    }
  </>
}

export default connect(
  (state) => ({
    mode: state.main.mode,
    selectedAreaData: state.main.selectedAreaData,
  }), {
    toggleMode,
  }
)(EditModeButton);
