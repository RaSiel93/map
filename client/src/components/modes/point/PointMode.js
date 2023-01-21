import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { Button } from 'components/common/Button';
import { modes } from 'constants';
import { toggleMode, resetPoint } from 'store/actions';
import PointModeModal from './PointModeModal';

const ModeButton = styled(Button)`
  // right: 260px;
  // bottom: 20px;

  &:after {
    // font-size: 30px;
    content: '!';
  }
`;

const PointMode = (props) => {
  const {
    mode,
    toggleMode,
    pointCoordinates,
  } = props;

  const active = mode === modes.POINT;

  const onClick = () => {
    toggleMode(modes.POINT);
    resetPoint();
  };

  return <>
    <ModeButton onClick={onClick} className={active ? 'active' : ''}/>
    {
      active && pointCoordinates && <PointModeModal
        isOpen={active}
      />
    }
  </>
}

PointMode.propTypes = {
  mode: PropTypes.string,
  toggleMode: PropTypes.func,
  pointCoordinates: PropTypes.array,
}

export default connect(
  (state) => ({
    mode: state.main.mode,
    pointCoordinates: state.main.pointCoordinates,
  }), {
    toggleMode,
    resetPoint,
  }
)(PointMode);
