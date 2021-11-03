import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { Button } from 'src/components/common/Button';
import { modes } from 'src/constants';
import { toggleMode } from 'src/store/actions';
import ShowModeModal from './ShowModeModal';

const ModeButton = styled(Button)`
  right: 200px;
  bottom: 20px;

  &:after {
    font-size: 30px;
    content: '@';
  }
`;

const ShowMode = (props) => {
  const {
    mode,
    toggleMode,
    selectedAreaData,
  } = props;

  const active = mode === modes.SHOW;

  const onClick = () => {
    toggleMode(modes.SHOW);
  };

  return <>
    <ModeButton onClick={onClick} className={active ? 'active' : ''}/>
    {
      active && selectedAreaData && <ShowModeModal
        isOpen={active}
      />
    }
  </>
}

ShowMode.propTypes = {
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
)(ShowMode);
