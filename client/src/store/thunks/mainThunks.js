import { client } from 'api/client';
import { areaToPolygonObject, pointToScatterplotObject } from 'services/deckGl';
import { setAreasData, setCompanies, setPointsData, setTags, setSearchResult } from 'store/actions';
import Cookies from 'js-cookie';

import { API_URL } from 'constants'

export const loadAreasData = () => (dispatch, state) => {
  client.get(`${API_URL}/api/v1/areas.json`, {
      params: {
        date: localStorage.getItem('date'),
        zoom: state().main.zoom,
        startDate: localStorage.getItem('filters.startDate') === 'true'
      },
      withCredentials: true
    })
    .then((response) => {
      dispatch(setAreasData(response.data.map(areaToPolygonObject)));
    })
    .catch((error) => {
      console.log(error)
    });
}

export const loadCompanies = () => (dispatch) => {
  client.get(`${API_URL}/api/v1/companies.json`, { withCredentials: true })
    .then((response) => {
      dispatch(setCompanies(response.data));
    })
    .catch((error) => {
      console.log(error)
    });
}

export const loadPointsData = () => (dispatch) => {
  client.get(`${API_URL}/api/v1/cars.json`, { withCredentials: true })
    .then((response) => {
      dispatch(setPointsData(response.data.map(pointToScatterplotObject)));
    })
    .catch((error) => {
      console.log(error)
    });
}

export const loadTags = () => (dispatch) => {
  client.get(`${API_URL}/api/v1/tag_keys.json`, { withCredentials: true })
    .then(response => {
      dispatch(setTags(response.data));
    })
    .catch((response) => {
      console.log(response);

      return [];
    })
}

export const search = () => (dispatch) => {
  client.get(`${API_URL}/api/v1/search.json`, { withCredentials: true, params: { q: localStorage.getItem('searchQuery'), date: localStorage.getItem('date') }})
    .then(response => {
      dispatch(setSearchResult(response.data));
    })
    .catch((response) => {
      console.log(response);

      return [];
    })
}
