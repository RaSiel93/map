import { client } from 'src/api/client';
import { areaToPolygonObject } from 'src/services/deckGl';
import { setAreasData } from 'src/store/actions';

export const loadAreasData = () => (dispatch) => {
  client.get('/api/v1/areas.json')
    .then((response) => {
      dispatch(setAreasData(response.data.data.map(areaToPolygonObject)));
    })
    .catch((error) => {
      console.log(error)
    })
}
