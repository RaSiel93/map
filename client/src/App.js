import { useEffect, useState, useCallback } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Cookies from 'js-cookie'
import throttle from 'lodash.throttle';
import styled from 'styled-components'
import './App.scss'
import cx from 'classnames'

import { useDrag } from 'hooks'
import { Sidebar, Information, Map, Navigation, SearchPanel } from 'components'
import {
  loadAreasData,
  loadCompanies,
  loadPointsData,
  loadTags,
  search,
} from 'store/thunks'

import {
  toggleSidebar,
  setDate,
} from 'store/actions'

const token = Cookies.get('csrf_token')

const Container = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;

  .Main {
    flex-grow: 1;
    position: relative;
  }

  .Sidebar-Button {
    position: absolute;
    align-items: center;
    top: 16px;
    left: 16px;
    padding: 12px;
    background-color: #fff;
    width: 16px;
    height: 16px;
    z-index: 20;

    display: flex;
    gap: 3px;
    flex-direction: column;
    justify-content: space-evenly;
    cursor: pointer;
    border-radius: 24px;

    .bar1, .bar2, .bar3 {
      width: 100%;
      height: 2px;
      background-color: #333;
      transition: 0.4s;
    }

    &.active {
      .bar1 {
        transform: translate(0, 6px) rotate(-45deg);
      }

      .bar2 { opacity: 0; }

      .bar3 {
        transform: translate(0, -6px) rotate(45deg);
      }
    }
  }
`


const App = (props) => {
  const {
    sidebarExtended,
    toggleSidebar,
    loadAreasData,
    loadPointsData,
    loadCompanies,
    loadTags,
    search,
    setDate,
    date,
    searchQuery,
    progress,
    progressContentLength,
    progressDuration,
    selectedTags,
  } = props;

  // const [date, setDate] = useState(localStorage.getItem('date'))

  const reloadData = useCallback(() => {
    loadAreasData()
    // loadPointsData()
    loadCompanies()
    loadTags()
  }, [])

  const throttledSearch = useCallback(throttle((value) => search(value), 1000), [search]);

  useEffect(() => {
    throttledSearch(searchQuery)
  }, [throttledSearch, searchQuery, date])

  useDrag()

  useEffect(() => {
    reloadData()
  }, [date])

  useEffect(() => {
    loadAreasData()
  }, [selectedTags])

  return token && (
    <Container>
      <Sidebar/>
      <div className='Main'>
        <div>
          <div className={cx("Sidebar-Button", { active: sidebarExtended })} onClick={toggleSidebar}>
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
          </div>
          <Information date={date}/>
        </div>
        <div className='Progress'>
          <div className='Progress-Bar' style={{ width: `${progress}%` }}>
            <div className='Progress-Content-Length'>{progressContentLength / 1000}&nbsp;KB</div>
            <div className='Progress-Separator'>/</div>
            <div className='Progress-Duration-Length'>{(progressDuration / 1000).toFixed(2)}&nbsp;s</div>
          </div>
        </div>
        <Map/>
        <Navigation/>
      </div>
      <SearchPanel/>
    </Container>
  )
}

App.propTypes = {
  loadAreasData: PropTypes.func,
  loadPointsData: PropTypes.func,
  loadCompanies: PropTypes.func,
  loadTags: PropTypes.func
}

export default connect(
  (state) => ({
    sidebarExtended: state.main.sidebarExtended,
    searchQuery: state.main.searchQuery,
    date: state.main.date,
    progress: state.main.progress,
    progressContentLength: state.main.progressContentLength,
    progressDuration: state.main.progressDuration,
    selectedTags: state.main.selectedTags,
  }),
  (dispatch) => ({
    loadAreasData: () => dispatch(loadAreasData()),
    loadCompanies: () => dispatch(loadCompanies()),
    loadPointsData: () => dispatch(loadPointsData()),
    loadTags: () => dispatch(loadTags()),
    toggleSidebar: () => dispatch(toggleSidebar()),
    setDate: () => dispatch(setDate()),
    search: (value) => dispatch(search(value)),
  })
)(App);
