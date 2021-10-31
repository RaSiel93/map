import { client } from 'src/api/client';
import {
  resetNewAreaPointsForAreaMode,
  toggleMode,
  addAreaData,
  updateAreaData,
} from 'src/store/actions';
import { modes } from 'src/constants';
import { areaToPolygonObject } from 'src/services/deckGl';

export const createAreaForAreaMode = (params, token) => (dispatch) => {
  client.post('/api/v1/areas.json', params, { headers: { 'X-CSRF-TOKEN': token }})
    .then((response) => {
      dispatch(toggleMode(modes.AREA));
      dispatch(resetNewAreaPointsForAreaMode());
      dispatch(addAreaData(areaToPolygonObject(response.data.data)));
    })
    .catch((error) => {
      console.log(error);
    })
};

export const updateAreaForAreaMode = (id, params, token) => (dispatch) => {
  client.put(`/api/v1/areas/${id}.json`, params, { headers: { 'X-CSRF-TOKEN': token }})
    .then((response) => {
      dispatch(toggleMode(modes.AREA));
      dispatch(resetNewAreaPointsForAreaMode());
      dispatch(updateAreaData(areaToPolygonObject(response.data.data)));
    })
    .catch((error) => {
      console.log(error);
    })
};
