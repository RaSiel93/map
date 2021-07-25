import axios from 'axios';

export function createPerson(params, token) {
  return axios.post('api/v1/people.json', params,  { headers: { 'X-CSRF-TOKEN': token }})
    .then(response => response.data.data)
    .catch((response) => {
      console.log(response)
    });
}
