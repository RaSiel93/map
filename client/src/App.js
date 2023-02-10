import { useEffect, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import debounce from 'lodash.debounce';
import './App.scss'

import { useDrag } from 'hooks'
import { Information, Map, Navigation } from 'components';
import {
  loadAreasData,
  loadCompanies,
  loadPointsData,
} from 'store/thunks';

const token = Cookies.get('csrf_token');

const App = (props) => {
  const {
    loadAreasData,
    loadPointsData,
    loadCompanies,
  } = props;

  const [latitude, setLatitude] = useState()
  const [longitude, setLongitude] = useState()
  const [date, setDate] = useState(localStorage.getItem('date'))

  const reloadData = useCallback(() => {
    loadAreasData();
    // loadPointsData();
    loadCompanies();
  }, [])

  useDrag()

  useEffect(() => {
    reloadData()
  }, [date])

  return token && (
    <div>
      <Information date={date}/>
      <Map setLatitude={setLatitude} setLongitude={setLongitude}/>
      <Navigation date={date} setDate={setDate} longitude={longitude} latitude={latitude}/>
    </div>
  )
}

App.propTypes = {
  loadAreasData: PropTypes.func,
  loadPointsData: PropTypes.func,
  loadCompanies: PropTypes.func,
}

export default connect(
  (state) => ({
  }),
  (dispatch) => ({
    loadAreasData: () => dispatch(loadAreasData()),
    loadCompanies: () => dispatch(loadCompanies()),
    loadPointsData: () => dispatch(loadPointsData()),
  })
)(App);
