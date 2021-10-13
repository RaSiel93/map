import axios from 'axios';

export function getArea(id) {
  return axios.get(`api/v1/areas/${id}.json`)
    .then(response => response.data.data)
    .catch((response) => {
      console.log(response);

      return null;
    })
}

export function getAreas() {
  return axios.get('api/v1/areas.json')
    .then(response => response.data.data)
    .catch((response) => {
      console.log(response);

      return [];
    })
}

export function createArea(params, token) {
  return axios.post('api/v1/areas.json', params, { headers: { 'X-CSRF-TOKEN': token }})
    .then(response => response.data.data)
    .catch((response) => {
      console.log(response);
    })
}

export function updateArea(id, params, token) {
  return axios.put(`api/v1/areas/${id}.json`, params, { headers: { 'X-CSRF-TOKEN': token }})
    .then(response => response.data.data)
    .catch((response) => {
      console.log(response);
    })
}

export function removeArea(id, token) {
  return axios.delete(`api/v1/areas/${id}.json`, { headers: { 'X-CSRF-TOKEN': token }})
    .then(response => response.data.data)
    .catch((response) => {
      console.log(response);
    })
}
