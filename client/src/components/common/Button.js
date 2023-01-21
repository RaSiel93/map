import styled from 'styled-components';

export const Button = styled.button`
  // position: absolute;
  width: 36px;
  height: 36px;
  background-color: #222;
  border: none;
  border-radius: 50%;
  z-index: 10;

  &:after {
    color: #aaa;
  }

  &:hover {
    background-color: #333;
    color: #ccc;
    cursor: pointer;
  }

  &.active {
    background-color: #444;
  }
`
