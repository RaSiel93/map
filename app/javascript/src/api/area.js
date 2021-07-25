import axios from 'axios';

export function getAreas() {
  return axios.get('api/v1/areas.json')
    .then(response => response.data.data)
    .catch((response) => {
      console.log(response);

      return [];
    })
}
