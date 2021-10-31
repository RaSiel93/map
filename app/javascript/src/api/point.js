import axios from 'axios';

export function getPoints() {
  return axios.get('api/v1/cars.json')
    .then(response => response.data.data)
    .catch((response) => {
      console.log(response);

      return [];
    })
}

export function createPoint(params, token) {
  return axios.post('api/v1/cars.json', params, { headers: { 'X-CSRF-TOKEN': token }})
    .then(response => response.data.data)
    .catch((response) => {
      console.log(response);
    })
}

export function updatePoint(id, params, token) {
  return axios.put(`api/v1/cars/${id}.json`, params, { headers: { 'X-CSRF-TOKEN': token }})
    .then(response => response.data.data)
    .catch((response) => {
      console.log(response);
    })
}

export function removePoint(id, token) {
  return axios.delete(`api/v1/cars/${id}.json`, { headers: { 'X-CSRF-TOKEN': token }})
    .then(response => response.data.data)
    .catch((response) => {
      console.log(response);
    })
}
