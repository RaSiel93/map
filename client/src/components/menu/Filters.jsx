import { useState } from 'react'
import styled from 'styled-components'

import { FILTER_START_DATE, FILTER_CITY, FILTER_INFO } from 'constants'
import { Button as CommonButton } from 'components/common/Button';

const Container = styled.div`
  display: flex;

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

const Button = styled(CommonButton)`
  &:after {
    content: '::';
  }
`

const Filters = () => {
  const [startDateFilter, setStartDateFilter] = useState(localStorage.getItem(FILTER_START_DATE) === 'true')
  const [cityFilter, setCityFilter] = useState(localStorage.getItem(FILTER_CITY) === 'true')
  const [infoFilter, setInfoFilter] = useState(localStorage.getItem(FILTER_INFO) === 'true')

  const [isActive, setActive] = useState(false)

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

  const onClick = () => {
    setActive(!isActive)
  }

  return (
    <Container>
      <Button onClick={onClick} title="Фільтры" className={isActive ? 'active' : ''}></Button>
      {
        isActive && (
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
        )
      }
    </Container>
  )
}

export default Filters
