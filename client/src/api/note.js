import axios from 'axios';
import Cookies from 'js-cookie';

export function createNote(params) {
  const token = Cookies.get('csrf_token');

  return axios.post('api/v1/notes.json', params,  { headers: { 'X-CSRF-TOKEN': token }, withCredentials: true})
    .then(response => response.data.data)
    .catch((response) => {
      console.log(response)
    });
}
