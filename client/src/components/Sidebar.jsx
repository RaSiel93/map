import { useState } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import cx from 'classnames'

import { FILTER_START_DATE, FILTER_INFO, FILTER_TAGS } from 'constants'
import { safeParseJson, compareTags } from 'utils/helper'
import { NavigateMode } from './Sidebar/navigate'


const Container = styled.div`
  flex-basis: 0;
  max-width: 0;
  transition: 1s;
  overflow: hidden;
  overflow-y: auto;

  &.active {
    max-width: 200px;
    flex-basis: 200px;
  }

  .Wrapper {
    padding: 8px;
  }

  .Filters {
    width: 184px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .FilterGroup {
    // padding: 0 8px;
  }

  .FilterGroupKey {
    font-weight: bold;
  }

  .FilterGroupValues {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
`

const Sidebar = ({ sidebarExtended, tags, longitude, latitude, zoom }) => {
  const [startDateFilter, setStartDateFilter] = useState(localStorage.getItem(FILTER_START_DATE) === 'true')
  const [infoFilter, setInfoFilter] = useState(localStorage.getItem(FILTER_INFO) === 'true')
  const [tagsFilter, setTagsFilter] = useState(safeParseJson(localStorage.getItem(FILTER_TAGS), []) || [])

  const toogleTagsFilter = (key, value) => {
    if (tagsFilter.some(compareTags(key, value))) {
      setTagsFilter((tags) => {
        const filteredTags = [...tags.filter(([key2, value2]) => (key !== key2) || (value !== value2))]

        localStorage.setItem(FILTER_TAGS, JSON.stringify(filteredTags))

        return filteredTags
      })
    } else {
      setTagsFilter((tags) => {
        const filteredTags = [
          ...tags,
          [key, value]
        ]

        localStorage.setItem(FILTER_TAGS, JSON.stringify(filteredTags))

        return filteredTags
      })
    }
  }

  const idFromTag = (key, value) => `${key}_${value}`

  const changeStartDateFilter = () => {
    setStartDateFilter(!startDateFilter)
    localStorage.setItem(FILTER_START_DATE, !startDateFilter)
  }

  const changeInfoFilter = () => {
    setInfoFilter(!infoFilter)
    localStorage.setItem(FILTER_INFO, !infoFilter)
  }

  return (
    <Container className={cx('Sidebar', { active: sidebarExtended })}>
      <div className='Wrapper'>
        <NavigateMode longitude={longitude} latitude={latitude} zoom={zoom}/>
        <div className="Filters">
          <div className='FilterGroup'>
            <div className="Filter">
              <input type="checkbox" id="startDate" checked={startDateFilter} onChange={changeStartDateFilter}/>
              <label htmlFor="startDate">Бяз&nbsp;даты</label>
            </div>
            <div className="Filter">
              <input type="checkbox" id="info" checked={infoFilter} onChange={changeInfoFilter}/>
              <label htmlFor="info">Інфармацыя</label>
            </div>
          </div>
          {
            tags && tags.map(({ attributes: { name: key, options } }, index) => {
              return (
                <div className='FilterGroup' key={index}>
                  <div className='FilterGroupKey'>{key}</div>
                  <div className='FilterGroupValues'>
                    {
                      options.map(({ attributes: { name: value }}, index) => {
                        return (
                          <div key={index}>
                            <input id={idFromTag(key, value)} type='checkbox' onChange={() => toogleTagsFilter(key, value)} checked={tagsFilter.some(compareTags(key, value))}></input>
                            <label htmlFor={idFromTag(key, value)}>{value}</label>
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </Container>
  )
}

export default connect(
  (state) => ({
    zoom: state.main.zoom,
    tags: state.main.tags,
    sidebarExtended: state.main.sidebarExtended
  }),
  (dispatch) => ({
  })
)(Sidebar);

