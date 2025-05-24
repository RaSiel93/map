import throttle from 'lodash.throttle';
import { client } from 'api/client';
import { areaToPolygonObject, pointToScatterplotObject } from 'services/deckGl';
import { setAreasData, setCompanies, setPointsData, setTags, setSearchResult, setProgress, setProgressContentLength, setProgressDuration } from 'store/actions';

import { API_URL } from 'constants'

let controller = null;

const throttledLoadAreasData = throttle((dispatch, date, zoom, startDate) => {
  dispatch(setProgressDuration(0))
  dispatch(setProgress(10));
  const start = performance.now();

  client.get(`${API_URL}/api/v1/areas.json`, {
      signal: controller.signal,
      params: {
        date,
        zoom,
        startDate
      },
      withCredentials: true,
      onDownloadProgress: (progressEvent) => {
        const percent = (progressEvent.loaded / (progressEvent?.total ?? 1)) * 100;

        dispatch(setProgressDuration(performance.now() - start));
        dispatch(setProgressContentLength(progressEvent.total));

        dispatch(setProgress(percent));
      }
    })
    .then((response) => {
      dispatch(setAreasData(response.data.map(areaToPolygonObject)));
    })
    .catch((error) => {
      if (error.name === 'CanceledError') {
        console.warn('📭 Запыт абаронены');
      } else {
        console.error(error);
      }
    });
}, 1000);

export const loadAreasData = () => (dispatch, state) => {
  if (controller) controller.abort();

  controller = new AbortController();

  const date = localStorage.getItem('date');
  const zoom = state().main.zoom;
  const startDate = localStorage.getItem('filters.startDate') === 'true';

  throttledLoadAreasData(dispatch, date, zoom, startDate);
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
