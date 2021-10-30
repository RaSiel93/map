import { client } from 'src/api/client';
// import { areaToPolygonObject } from 'src/services/deckGl';
import { setAreaForEditMode } from 'src/store/actions';

export const loadAreaForEditMode = (id) => (dispatch) => {
  client.get(`/api/v1/areas/${id}.json`)
    .then((response) => {
      dispatch(setAreaForEditMode(response.data.data));
    })
    .catch((error) => {
      console.log(error)
    })
}
