import axios from 'axios';
import Cookies from 'js-cookie';

import { API_URL } from 'constants'

export function getPoints() {
  return axios.get(`${API_URL}/api/v1/cars.json`)
    .then(response => response.data)
    .catch((response) => {
      console.log(response);

      return [];
    })
}

export function createPoint(params) {
  const token = Cookies.get('csrf_token');

  console.log('token', token)

  return axios.post(`${API_URL}/api/v1/cars.json`, params, { headers: { 'X-CSRF-TOKEN': token }, withCredentials: true })
    .then(response => response.data)
    .catch((response) => {
      console.log(response);
    })
}

export function updatePoint(id, params) {
  const token = Cookies.get('csrf_token');

  return axios.put(`${API_URL}/api/v1/cars/${id}.json`, params, { headers: { 'X-CSRF-TOKEN': token }, withCredentials: true })
    .then(response => response.data)
    .catch((response) => {
      console.log(response);
    })
}

export function removePoint(id) {
  const token = Cookies.get('csrf_token');

  return axios.delete(`${API_URL}/api/v1/cars/${id}.json`, { headers: { 'X-CSRF-TOKEN': token }, withCredentials: true })
    .then(response => response.data)
    .catch((response) => {
      console.log(response);
    })
}
