import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { Button } from 'components/common/Button';
import { modes } from 'constants';
import { toggleMode } from 'store/actions';
import EditModeModal from './EditModeModal';

const ModeButton = styled(Button)`
  // right: 140px;
  // bottom: 20px;

  &:after {
    // font-size: 30px;
    content: '/';
  }
`

const EditMode = (props) => {
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
    <ModeButton onClick={onClick} title="Рэдагаваньне" className={active ? 'active' : ''}/>
    {
      active && selectedAreaData && <EditModeModal
        isOpen={active}
      />
    }
  </>
}

EditMode.propTypes = {
  mode: PropTypes.string,
  toggleMode: PropTypes.func,
  selectedAreaData: PropTypes.object,
}

export default connect(
  (state) => ({
    mode: state.main.mode,
    selectedAreaData: state.main.selectedAreaData,
  }), {
    toggleMode,
  }
)(EditMode);
