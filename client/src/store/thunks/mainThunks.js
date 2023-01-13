import { client } from 'api/client';
import { areaToPolygonObject, pointToScatterplotObject } from 'services/deckGl';
import { setAreasData, setCompanies, setPointsData } from 'store/actions';
import Cookies from 'js-cookie';

import { API_URL } from 'constants'

export const loadAreasData = () => (dispatch) => {
  client.get(`${API_URL}/api/v1/areas.json`, { params: { date: localStorage.getItem('date') }, withCredentials: true })
    .then((response) => {
      dispatch(setAreasData(response.data.data.map(areaToPolygonObject)));
    })
    .catch((error) => {
      console.log(error)
    });
}

export const loadCompanies = () => (dispatch) => {
  client.get(`${API_URL}/api/v1/companies.json`, { withCredentials: true })
    .then((response) => {
      dispatch(setCompanies(response.data.data));
    })
    .catch((error) => {
      console.log(error)
    });
}

export const loadPointsData = () => (dispatch) => {
  client.get(`${API_URL}/api/v1/cars.json`, { withCredentials: true })
    .then((response) => {
      dispatch(setPointsData(response.data.data.map(pointToScatterplotObject)));
    })
    .catch((error) => {
      console.log(error)
    });
}
