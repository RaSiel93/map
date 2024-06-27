import axios from 'axios';
import Cookies from 'js-cookie';

import { API_URL } from 'constants'

export function getArea(id) {
  return axios.get(`${API_URL}/api/v1/areas/${id}.json`, { withCredentials: true })
    .then(response => response.data)
    .catch((response) => {
      console.log(response);

      return null;
    })
}

export function getAreas() {
  return axios.get(`${API_URL}/api/v1/areas.json`, { withCredentials: true })
    .then(response => response.data)
    .catch((response) => {
      console.log(response);

      return [];
    })
}

export function createArea(params) {
  const token = Cookies.get('csrf_token');

  return axios.post(`${API_URL}/api/v1/areas.json`, params, { headers: { 'X-CSRF-TOKEN': token, withCredentials: true }})
    .then(response => response.data)
    .catch((response) => {
      console.log(response);
    })
}

export function updateArea(id, params) {
  const token = Cookies.get('csrf_token');

  return axios.put(`${API_URL}/api/v1/areas/${id}.json`, params, { headers: { 'X-CSRF-TOKEN': token, withCredentials: true }})
    .then(response => response.data)
    .catch((response) => {
      console.log(response);
    })
}

export function removeArea(id) {
  const token = Cookies.get('csrf_token');

  return axios.delete(`${API_URL}/api/v1/areas/${id}.json`, { headers: { 'X-CSRF-TOKEN': token, withCredentials: true }})
    .then(response => response.data)
    .catch((response) => {
      console.log(response);
    })
}
