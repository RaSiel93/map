import axios from 'axios';
import Cookies from 'js-cookie';

export function createPerson(params) {
  const token = Cookies.get('csrf_token');

  return axios.post('api/v1/people.json', params,  { headers: { 'X-CSRF-TOKEN': token }, withCredentials: true})
    .then(response => response.data)
    .catch((response) => {
      console.log(response)
    });
}
