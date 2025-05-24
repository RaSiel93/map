import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import cx from 'classnames'

import { FILTER_START_DATE, FILTER_INFO, FILTER_ICON, FILTER_TITLE, FILTER_CLUSTER, SELECTED_TAGS } from 'constants'
import { safeParseJson, compareTags } from 'utils/helper'
import { NavigateMode } from './Sidebar/navigate'
import { setMapStyle, setSearchQuery, setSelectedTags, setTitleShow, setClusterShow, setIconShow, setAreaShow } from 'store/actions'

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
    display: flex;
    flex-direction: column;
    gap: 16px;
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

const Sidebar = ({
    sidebarExtended,
    tags,
    searchQuery,
    setSearchQuery,
    date,
    selectedTags,
    setSelectedTags,
    setMapStyle,
    mapStyle,
    setTitleShow,
    titleShow,
    clusterShow,
    setClusterShow,
    iconShow,
    setIconShow,
    areaShow,
    setAreaShow,
  }) => {
  const [startDateFilter, setStartDateFilter] = useState(localStorage.getItem(FILTER_START_DATE) === 'true')
  const [infoFilter, setInfoFilter] = useState(localStorage.getItem(FILTER_INFO) === 'true')

  const toogleTagsFilter = (key, value) => {
    if (selectedTags.some(compareTags(key, value))) {
      setSelectedTags([...selectedTags.filter(([key2, value2]) => (key !== key2) || (value !== value2))])
    } else {
      setSelectedTags([...selectedTags, [key, value]])
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

  const changeIconShow = () => {
    setIconShow(!iconShow)
  }

  const changeMapStyle = () => {
    setMapStyle(mapStyle === 'satellite' ? null : 'satellite')
  }

  const changeTitleShow = () => {
    setTitleShow(!titleShow)
  }

  const changeClusterShow = () => {
    setClusterShow(!clusterShow)
  }

  const changeAreaShow = () => {
    setAreaShow(!areaShow)
  }

  const onSearch = ({ target: { value }}) => {
    setSearchQuery(value)
  }

  return (
    <Container className={cx('Sidebar', { active: sidebarExtended })}>
      <div className='Wrapper'>
        <input className='Search' placeholder='Пошук' value={searchQuery} onChange={onSearch}></input>
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
            <div className="Filter">
              <input type="checkbox" id="icon" checked={iconShow} onChange={changeIconShow}/>
              <label htmlFor="icon">Іконкі</label>
            </div>
            <div className="Filter">
              <input type="checkbox" id="mapStyle" checked={mapStyle === 'satellite'} onChange={changeMapStyle}/>
              <label htmlFor="mapStyle">Спутнік</label>
            </div>
            <div className='Filter'>
              <input type="checkbox" id="titleShow" checked={titleShow} onChange={changeTitleShow}/>
              <label htmlFor="titleShow">Подпісы</label>
            </div>
            <div className='Filter'>
              <input type="checkbox" id="clusterShow" checked={clusterShow} onChange={changeClusterShow}/>
              <label htmlFor="clusterShow">Кластэры</label>
            </div>
            <div className='Filter'>
              <input type="checkbox" id="areaShow" checked={areaShow} onChange={changeAreaShow}/>
              <label htmlFor="areaShow">Абьекты</label>
            </div>
          </div>
          {
            tags && tags.map(({ name: key, options }, index) => {
              return (
                <div className='FilterGroup' key={index}>
                  <div className='FilterGroupKey'>{key}</div>
                  <div className='FilterGroupValues'>
                    {
                      options.map(({ name: value }, index) => {
                        return (
                          <div key={index}>
                            <input id={idFromTag(key, value)} type='checkbox' onChange={() => toogleTagsFilter(key, value)} checked={selectedTags.some(compareTags(key, value))}></input>
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
    searchQuery: state.main.searchQuery,
    selectedTags: state.main.selectedTags,
    sidebarExtended: state.main.sidebarExtended,
    mapStyle: state.main.mapStyle,
    date: state.main.date,
    titleShow: state.main.titleShow,
    iconShow: state.main.iconShow,
    clusterShow: state.main.clusterShow,
    areaShow: state.main.areaShow,
  }),
  (dispatch) => ({
    setSearchQuery: (value) => dispatch(setSearchQuery(value)),
    setSelectedTags: (tags) => dispatch(setSelectedTags(tags)),
    setMapStyle: (style) => dispatch(setMapStyle(style)),
    setTitleShow: (show) => dispatch(setTitleShow(show)),
    setIconShow: (show) => dispatch(setIconShow(show)),
    setClusterShow: (show) => dispatch(setClusterShow(show)),
    setAreaShow: (show) => dispatch(setAreaShow(show)),
  })
)(Sidebar);

