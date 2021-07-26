import React from 'react';
import styled from 'styled-components';
import { Button } from './Button';

const ModeButton = styled(Button)`
  right: 200px;
  bottom: 20px;

  &:after {
    font-size: 30px;
    content: '@';
  }
`

export const ModeShowButton = (props) => {
  const { onClick } = props;

  return <>
    <ModeButton onClick={onClick}/>
  </>
}
