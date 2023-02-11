import { useState } from 'react'
import { connect } from 'react-redux';
import styled from 'styled-components';
import { AreaMode, EditMode, PointMode, ShowMode, NoteMode, ImportMode, NavigateMode, DateMode } from 'components/modes';
import cx from 'classnames'

import { NAVIGATION_COLLAPSE, FILTER_START_DATE, FILTER_CITY, FILTER_INFO } from 'constants'

const Container = styled.div`
  display: flex;
  position: fixed;
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

  .Filters {
    gap: 8px;
    align-items: center;
    // flex-direction: column;
    // flex-wrap: wrap;
    display: flex;
    height: 36px;

    .Filter {
      input, label {
        cursor: pointer;
      }

      &:hover {
        color: #333;
      }
    }
  }
`

const Navigation = ({ date, setDate, longitude, latitude, zoom }) => {
  const [collapse, setCollapse] = useState(localStorage.getItem(NAVIGATION_COLLAPSE) === 'true')
  const [startDateFilter, setStartDateFilter] = useState(localStorage.getItem(FILTER_START_DATE) === 'true')
  const [cityFilter, setCityFilter] = useState(localStorage.getItem(FILTER_CITY) === 'true')
  const [infoFilter, setInfoFilter] = useState(localStorage.getItem(FILTER_INFO) === 'true')

  const onClick = () => {
    setCollapse(!collapse)
    localStorage.setItem(NAVIGATION_COLLAPSE, !collapse)
  }

  const changeStartDateFilter = () => {
    setStartDateFilter(!startDateFilter)
    localStorage.setItem(FILTER_START_DATE, !startDateFilter)
  }

  const changeCityFilter = () => {
    setCityFilter(!cityFilter)
    localStorage.setItem(FILTER_CITY, !cityFilter)
  }

  const changeInfoFilter = () => {
    setInfoFilter(!infoFilter)
    localStorage.setItem(FILTER_INFO, !infoFilter)
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
          <DateMode date={date} setDate={setDate}/>
          <ImportMode/>
          <NavigateMode longitude={longitude} latitude={latitude} zoom={zoom}/>
          <PointMode/>
          <ShowMode/>
          <EditMode/>
          <AreaMode/>
          <NoteMode/>
          <div className="Filters">
            <div className="Filter">
              <input type="checkbox" id="startDate" checked={startDateFilter} onClick={changeStartDateFilter}/>
              <label for="startDate">Бяз&nbsp;даты</label>
            </div>
            <div className="Filter">
              <input type="checkbox" id="city" checked={cityFilter} onClick={changeCityFilter}/>
              <label for="city">Гарады</label>
            </div>
            <div className="Filter">
              <input type="checkbox" id="info" checked={infoFilter} onClick={changeInfoFilter}/>
              <label for="info">Інфармацыя</label>
            </div>
          </div>
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
