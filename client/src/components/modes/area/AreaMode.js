import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Button } from 'components/common/Button';
import { modes } from 'constants';

import {
  toggleMode,
  resetNewAreaPointsForAreaMode,
} from 'store/actions';

import {
  // createArea,
  createAreaForAreaMode,
  updateAreaForAreaMode,
  // updateArea,
} from 'store/thunks';

const ModeButton = styled(Button)`
  // right: 80px;
  // bottom: 20px;

  &:after {
    // font-size: 30px;
    content: '#';
  }
`;

const CreateButton = styled(Button)`
  right: 80px;
  bottom: 80px;

  &:after {
    content: 'create';
  }
`;

const UpdateButton = styled(Button)`
  right: 80px;
  bottom: 140px;

  &:after {
    content: 'update';
  }
`;

const AreaMode = (props) => {
  const {
    mode,
    selectedAreaData,
    newAreaPoints,
    // createArea,
    // update,
    resetNewAreaPointsForAreaMode,
    toggleMode,
    createAreaForAreaMode,
    updateAreaForAreaMode,
    // createStatus,
    // updateStatus,
  } = props;

  const active = mode === modes.AREA;

  // useEffect(() => {
  //   if (createStatus === requestStatuses.CREATED) {
  //     resetAreaNew();
  //   }
  // }, [createStatus]);

  // useEffect(() => {
  //   if (updateStatus === requestStatuses.UPDATED) {
  //     resetAreaNew();
  //   }
  // }, [updateStatus]);

  const onClick = () => {
    toggleMode(modes.AREA);
    resetNewAreaPointsForAreaMode();
  };

  const onCreate = () => {
    const params = {
      area: {
        coordinates: newAreaPoints.map(JSON.stringify),
      }
    };

    createAreaForAreaMode(params);
  };

  const onUpdate = () => {
    const params = {
      area: {
        coordinates: newAreaPoints.map(JSON.stringify),
      }
    };

    updateAreaForAreaMode(selectedAreaData.id, params);
  };

  return <>
    <ModeButton onClick={onClick} className={active ? 'active' : ''}/>
    {
      active && newAreaPoints.length > 0 && <>
        <CreateButton onClick={onCreate}/>
        {
          selectedAreaData && <UpdateButton onClick={onUpdate}/>
        }
      </>
    }
  </>
}

AreaMode.propTypes = {
  mode: PropTypes.string,
  selectedAreaData: PropTypes.object,
  newAreaPoints: PropTypes.array,
  resetNewAreaPointsForAreaMode: PropTypes.func,
  toggleMode: PropTypes.func,
  createAreaForAreaMode: PropTypes.func,
  updateAreaForAreaMode: PropTypes.func,
}

export default connect(
  (state) => ({
    mode: state.main.mode,
    selectedAreaData: state.main.selectedAreaData,
    newAreaPoints: state.modes.area.newAreaPoints,
    // createStatus: state.modes.area.createStatus,
    // updateStatus: state.modes.area.createStatus,
  }),
  {
    toggleMode,
    resetNewAreaPointsForAreaMode,
    // createArea,
    createAreaForAreaMode,
    updateAreaForAreaMode,
  }
)(AreaMode);
