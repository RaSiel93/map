import { client } from 'api/client';
import {
  resetNewAreaPointsForAreaMode,
  toggleMode,
  addAreaData,
  updateAreaData,
} from 'store/actions';
import { modes } from 'constants';
import Cookies from 'js-cookie';
import { areaToPolygonObject } from 'services/deckGl';
import { API_URL } from 'constants'

export const createAreaForAreaMode = (params) => (dispatch) => {
  const token = Cookies.get('csrf_token');

  client.post(`${API_URL}/api/v1/areas.json`, params, { headers: { 'X-CSRF-TOKEN': token }})
    .then((response) => {
      dispatch(toggleMode(modes.AREA));
      dispatch(resetNewAreaPointsForAreaMode());
      dispatch(addAreaData(areaToPolygonObject(response.data.data)));
    })
    .catch((error) => {
      console.log(error);
    })
};

export const updateAreaForAreaMode = (id, params) => (dispatch) => {
  const token = Cookies.get('csrf_token');

  client.put(`${API_URL}/api/v1/areas/${id}.json`, params, { headers: { 'X-CSRF-TOKEN': token }})
    .then((response) => {
      dispatch(toggleMode(modes.AREA));
      dispatch(resetNewAreaPointsForAreaMode());
      dispatch(updateAreaData(areaToPolygonObject(response.data.data)));
    })
    .catch((error) => {
      console.log(error);
    })
};
