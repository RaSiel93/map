import { useState } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { AreaMode, EditMode, PointMode, ShowMode, NoteMode, ImportMode, DateMode } from 'components/modes'

import cx from 'classnames'

import { NAVIGATION_COLLAPSE } from 'constants'

const Container = styled.div`
  display: flex;
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: #fff6;
  z-index: 1;
  width: 100%;
  flex-direction: column;

  .Buttons {
    // justify-content: flex-end;
    // display: flex;
    align-items: right;
    overflow-x: auto;
    width: 100%;
  }

  .Buttons-Wrapper {
    flex-wrap: nowrap;
    gap: 8px;
    display: flex;
    // overflow-x: auto;
    padding: 8px;
    width: fit-content;
    margin: 0 0 0 auto;

    button {
      min-width: 36px;
    }
  }

  .CollapseButton {
    display: block;
    text-align: center;
    width: 100%;
    background-color: #6666;
    border-top: 1px solid #aaa6;
    cursor: pointer;

    &:hover {
      border-top: 1px solid #aaaa;
      background-color: #666a;
    }

    svg {
      stroke: #444;
      stroke-width: 4;
    }
  }

  &.Collapse {
    .Buttons {
      display: none;
    }

    svg {
      transform: rotate(180deg)
    }
  }
`

const Navigation = () => {
  const [collapse, setCollapse] = useState(localStorage.getItem(NAVIGATION_COLLAPSE) === 'true')

  const onClick = () => {
    setCollapse(!collapse)
    localStorage.setItem(NAVIGATION_COLLAPSE, !collapse)
  }


  return (
    <Container className={cx({ Collapse: collapse })}>
      <div className='CollapseButton' onClick={onClick}>
        <svg viewBox="0 0 64 18" height="8" width="64" xmlns="http://www.w3.org/2000/svg">
          <line x1="0" y1="0" x2="32" y2="16" />
          <line x1="64" y1="0" x2="32" y2="16" />
        </svg>
      </div>
      <div className='Buttons'>
        <div className='Buttons-Wrapper'>
          <DateMode/>
          <ImportMode/>
          <PointMode/>
          <ShowMode/>
          <EditMode/>
          <AreaMode/>
          <NoteMode/>
          {/*<PersonMode*/}
        </div>
      </div>
    </Container>
  )
}

export default connect(
  (state) => ({
    zoom: state.main.zoom,
  }),
  (dispatch) => ({
  })
)(Navigation);
