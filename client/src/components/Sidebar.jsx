import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import cx from 'classnames'

import { FILTER_START_DATE, FILTER_INFO, FILTER_ICON, FILTER_TITLE, FILTER_CLUSTER, SELECTED_TAGS } from 'constants'
import { NavigateMode } from './Sidebar/navigate'
import { setMapStyle, setSearchQuery, setSelectedTags, setTitleShow, setClusterShow, setIconShow, setAreaShow, setClusterShowValue } from 'store/actions'

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
    // width: 184px;
    display: flex;
    flex-direction: column;
    gap: 8px;
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

  .FilterGroupValueItem {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    width: 100%;
  }

  .FilterGroupValueItemLabel {
    display: flex;
    flex-direction: row;
    flex-wrap: no-wrap;
  }

  .FilterGroupValueItem label {
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
    clusterShowValue,
    setClusterShowValue,
    iconShow,
    setIconShow,
    areaShow,
    setAreaShow,
  }) => {
  const [startDateFilter, setStartDateFilter] = useState(localStorage.getItem(FILTER_START_DATE) === 'true')
  const [infoFilter, setInfoFilter] = useState(localStorage.getItem(FILTER_INFO) === 'true')
  const [collapsedGroups, setCollapsedGroups] = useState({})

  const toogleTagsFilter = (id) => {
    if (selectedTags.find(({ id: selectedId }) => id === selectedId)) {
      setSelectedTags([...selectedTags.filter(({ id: selectedId }) => id !== selectedId)])
    } else {
      setSelectedTags([...selectedTags, { id }])
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

  const changeClusterShowValue = (e) => {
    setClusterShowValue(e.target.value)
  }

  const changeAreaShow = () => {
    setAreaShow(!areaShow)
  }

  const onSearch = ({ target: { value }}) => {
    setSearchQuery(value)
  }

  const toggleGroup = (key) => {
    setCollapsedGroups(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const changeTagColor = (id, color) => {
    setSelectedTags(selectedTags.map((tag) => {
      if (tag.id === id) {
        return { ...tag, color }
      }

      return tag
    }))
  }

  return (
    <Container className={cx('Sidebar', { active: sidebarExtended })}>
      <div className='Wrapper'>
        <input className='Search' placeholder='Пошук' value={searchQuery ?? ''} onChange={onSearch}></input>
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
              <input type="checkbox" id="areaShow" checked={areaShow} onChange={changeAreaShow}/>
              <label htmlFor="areaShow">Абьекты</label>
            </div>
            <br/>
            <div className='FilterGroup'>
              <div className='FilterGroupKey'>Кластэры</div>
              <div className='Filter'>
                <input type="checkbox" id="clusterShow" checked={clusterShow} onChange={changeClusterShow}/>
                <label htmlFor="clusterShow">Уключыць</label>
              </div>
              <div className='Filter'>
                <select id="clusterShowValue" value={clusterShowValue} onChange={changeClusterShowValue}>
                  <option value="people_count">Колькасць людзёў</option>
                  <option value="point_count">Колькасць пунктаў</option>
                </select>
              </div>
            </div>
          </div>
          {
            tags && tags.map(({ id: tagId, name: key, options }, index) => {
              return (
                <div className='FilterGroup' key={index}>
                  <div className='FilterGroupKey' onClick={() => toggleGroup(key)} style={{ cursor: 'pointer' }}>
                    {collapsedGroups[key] ? '▸' : '▾'} {key}
                  </div>
                  {!collapsedGroups[key] && (
                    <div className='FilterGroupValues'>
                      {
                        options.map(({ id, name: value }, index) => {
                          const checked = selectedTags.find(({ id: selectedId }) => id === selectedId);
                          const color = selectedTags.find(({ id: selectedId }) => id === selectedId)?.color;

                          return (
                            <div key={index} className='FilterGroupValueItem'>
                              <div className='FilterGroupValueItemLabel'>
                                <input id={value} type='checkbox' onChange={() => toogleTagsFilter(id)} checked={checked}></input>
                                <label htmlFor={value}>{value}</label>
                              </div>
                              <div>
                                {
                                  checked && <input type='color' onChange={(e) => changeTagColor(id, e.target.value)} value={color ?? '#ffffff'}></input>
                                }
                              </div>
                            </div>
                          )
                        })
                      }
                    </div>
                  )}
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
    clusterShowValue: state.main.clusterShowValue,
    areaShow: state.main.areaShow,
  }),
  (dispatch) => ({
    setSearchQuery: (value) => dispatch(setSearchQuery(value)),
    setSelectedTags: (tags) => dispatch(setSelectedTags(tags)),
    setMapStyle: (style) => dispatch(setMapStyle(style)),
    setTitleShow: (show) => dispatch(setTitleShow(show)),
    setIconShow: (show) => dispatch(setIconShow(show)),
    setClusterShow: (show) => dispatch(setClusterShow(show)),
    setClusterShowValue: (value) => dispatch(setClusterShowValue(value)),
    setAreaShow: (show) => dispatch(setAreaShow(show)),
  })
)(Sidebar);

