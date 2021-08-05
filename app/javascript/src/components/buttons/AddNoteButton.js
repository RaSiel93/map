import React from 'react';
import styled from 'styled-components';
import { Button } from './Button';

const AddButton = styled(Button)`
  bottom: 20px;
  right: 20px;

  &:after {
    font-size: 30px;
    content: '+';
  }
`

export const AddNoteButton = (props) => {
  const { onClick } = props;

  return <AddButton onClick={onClick}/>
}
