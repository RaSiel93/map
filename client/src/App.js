import { useEffect, useState, useCallback } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Cookies from 'js-cookie'
import debounce from 'lodash.debounce'
import styled from 'styled-components'
import './App.scss'
import cx from 'classnames'

import { useDrag } from 'hooks'
import { Sidebar, Information, Map, Navigation } from 'components'
import {
  loadAreasData,
  loadCompanies,
  loadPointsData,
  loadTags
} from 'store/thunks'

import {
  toggleSidebar,
} from 'store/actions'

const token = Cookies.get('csrf_token')

const Container = styled.div`
  display: flex;
  // height: 100%;
  height: 100vh;

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
  } = props;

  const [latitude, setLatitude] = useState()
  const [longitude, setLongitude] = useState()
  const [date, setDate] = useState(localStorage.getItem('date'))

  const reloadData = useCallback(() => {
    loadAreasData()
    // loadPointsData()
    loadCompanies()
    loadTags()
  }, [])

  useDrag()

  useEffect(() => {
    reloadData()
  }, [date])

  return token && (
    <Container>
      <Sidebar longitude={longitude} latitude={latitude}/>
      <div className='Main'>
        <div>
          <div className={cx("Sidebar-Button", { active: sidebarExtended })} onClick={toggleSidebar}>
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
          </div>
          <Information date={date}/>
        </div>
        <Map setLatitude={setLatitude} setLongitude={setLongitude}/>
        <Navigation date={date} setDate={setDate}/>
      </div>
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
    sidebarExtended: state.main.sidebarExtended
  }),
  (dispatch) => ({
    loadAreasData: () => dispatch(loadAreasData()),
    loadCompanies: () => dispatch(loadCompanies()),
    loadPointsData: () => dispatch(loadPointsData()),
    loadTags: () => dispatch(loadTags()),
    toggleSidebar: () => dispatch(toggleSidebar())
  })
)(App);
