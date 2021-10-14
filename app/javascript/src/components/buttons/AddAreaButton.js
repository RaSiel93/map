import React from 'react';
import styled from 'styled-components';
import { Button } from './Button';

const ModeButton = styled(Button)`
  right: 80px;
  bottom: 20px;

  &:after {
    font-size: 30px;
    content: '#';
  }
`

const SaveButton = styled(Button)`
  right: 80px;
  bottom: 80px;

  &:after {
    content: 'save';
  }
`

const EditButton = styled(Button)`
  right: 80px;
  bottom: 140px;

  &:after {
    content: 'update';
  }
`

export const AddAreaButton = (props) => {
  const { active, onClick, onSubmit, onEdit, id } = props;

  return <>
    <ModeButton onClick={onClick} className={active ? 'active' : ''}/>
    {
      active && <>
        <SaveButton onClick={() => onSubmit()}/>
        {
          id && <EditButton onClick={() => onEdit({ id })}/>
        }
      </>
    }
  </>
}
