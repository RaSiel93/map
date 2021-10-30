import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Button } from 'src/components/common/Button';
import { modes } from 'src/constants';

import {
  toggleMode,
  resetNewAreaPoints,
} from 'src/store/actions';

import {
  // createArea,
  createAreaForAreaMode,
  updateAreaForAreaMode,
  // updateArea,
} from 'src/store/thunks';

const ModeButton = styled(Button)`
  right: 80px;
  bottom: 20px;

  &:after {
    font-size: 30px;
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
    resetNewAreaPoints,
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
    resetNewAreaPoints();
  };

  const onCreate = () => {
    const params = {
      area: {
        coordinates: newAreaPoints.map(JSON.stringify),
      }
    };
    const token = document.querySelector('[name=csrf-token]').content;

    createAreaForAreaMode(params, token);
  };

  const onUpdate = () => {
    const params = {
      area: {
        coordinates: newAreaPoints.map(JSON.stringify),
      }
    };
    const token = document.querySelector('[name=csrf-token]').content;

    updateAreaForAreaMode(selectedAreaData.id, params, token);
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
    resetNewAreaPoints,
    // createArea,
    createAreaForAreaMode,
    updateAreaForAreaMode,
  }
)(AreaMode);
