import { connect } from 'react-redux'
import styled from 'styled-components'
import cx from 'classnames'

import { setMapStyle, setSearchQuery, setSelectedTags, setSearchHoveredAreaId, setSelectedAreaData, toggleMode } from 'store/actions'
import { modes } from 'constants'

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

  .SearchResult {
    display: flex;
    flex-direction: column;
    gap: 8px;

    &-Item {
      padding: 4px;
      font-size: 14px;
      cursor: pointer;

      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
      overflow: hidden;
      border: 1px solid #aaa6;
      background-color: #6661;

      &:hover {
        border: 1px solid #aaaa;
        background-color: #666a;
      }

      &-Title {
        font-weight: bold;
        display: block;
      }
    }
  }

  // .Filters {
  //   width: 184px;
  //   display: flex;
  //   flex-direction: column;
  //   gap: 16px;
  // }

  // .FilterGroup {
  //   // padding: 0 8px;
  // }

  // .FilterGroupKey {
  //   font-weight: bold;
  // }

  // .FilterGroupValues {
  //   display: flex;
  //   flex-direction: row;
  //   flex-wrap: wrap;
  // }
`

const SearchPanel = ({ id, sidebarExtended, search, setSearchQuery, searchQuery, searchResult, setSearchHoveredAreaId, setSelectedAreaData, areasData, toggleMode }) => {
  const onSearch = ({ target: { value }}) => {
    setSearchQuery(value)
  }

  const changeArea = (id) => {
    // setArea(null)
    // resetFields()
    setSelectedAreaData(areasData.find((areaData) => (areaData.id === id)))
    toggleMode(modes.EDIT)
  }

  return (
    <Container className={cx('SearchPanel', { active: sidebarExtended })}>
      <div className='Wrapper'>
        <input className='Search' placeholder='Пошук' value={searchQuery} onChange={onSearch}></input>
        <div className='SearchResult'>
          Колькасьць: {searchResult.length}
          {
            searchResult.map(({ id, title, description }, index) => {
              return (
                <div key={`${index}-${id}`} className='SearchResult-Item' onClick={() => changeArea(id)} onMouseEnter={() => setSearchHoveredAreaId(id)} onMouseLeave={() => setSearchHoveredAreaId(null)}>
                  <span className='SearchResult-Item-Title'>{title}</span>
                  { description }
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
    searchResult: state.main.searchResult,
    mapStyle: state.main.mapStyle,
    date: state.main.date,
    id: state.main.selectedAreaData?.id,
    areasData: state.main.areasData,
  }),
  (dispatch) => ({
    setSearchQuery: (value) => dispatch(setSearchQuery(value)),
    setSelectedTags: (tags) => dispatch(setSelectedTags(tags)),
    setMapStyle: (style) => dispatch(setMapStyle(style)),
    setSearchHoveredAreaId: (id) => dispatch(setSearchHoveredAreaId(id)),
    setSelectedAreaData: (data) => dispatch(setSelectedAreaData(data)),
    toggleMode: (mode) => dispatch(toggleMode(mode)),
  })
)(SearchPanel);

