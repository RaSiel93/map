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

export const AddAreaButton = (props) => {
  const { mode, onClick, onSubmit } = props;

  return <>
    <ModeButton onClick={onClick}/>
    { mode === 'area' && <SaveButton onClick={onSubmit}/> }
  </>
}
