import { client } from 'src/api/client';
import { areaToPolygonObject, pointToScatterplotObject } from 'src/services/deckGl';
import { setAreasData, setCompanies, setPointsData } from 'src/store/actions';

export const loadAreasData = () => (dispatch) => {
  client.get('/api/v1/areas.json')
    .then((response) => {
      dispatch(setAreasData(response.data.data.map(areaToPolygonObject)));
    })
    .catch((error) => {
      console.log(error)
    });
}

export const loadCompanies = () => (dispatch) => {
  client.get('/api/v1/companies.json')
    .then((response) => {
      dispatch(setCompanies(response.data.data));
    })
    .catch((error) => {
      console.log(error)
    });
}

export const loadPointsData = () => (dispatch) => {
  client.get('/api/v1/cars.json')
    .then((response) => {
      dispatch(setPointsData(response.data.data.map(pointToScatterplotObject)));
    })
    .catch((error) => {
      console.log(error)
    });
}
