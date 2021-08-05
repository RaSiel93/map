import axios from 'axios';

export function createNote(params, token) {
  return axios.post('api/v1/notes.json', params,  { headers: { 'X-CSRF-TOKEN': token }})
    .then(response => response.data.data)
    .catch((response) => {
      console.log(response)
    });
}
