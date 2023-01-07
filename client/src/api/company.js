import axios from 'axios';

export function getCompanies() {
  return axios.get('api/v1/companies.json', { withCredentials: true })
    .then(response => response.data.data)
    .catch((response) => {
      console.log(response);

      return [];
    })
}
