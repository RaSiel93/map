import { client } from '../../api/client';
import {
  // NOTES_CREATE_REQUEST,
  // NOTES_CREATE_SUCCESS,
  // NOTES_CREATE_FAILURE,
  // NOTES_RESET,
} from '../../constants';

export const createNote = (params, token) => (dispatch) => {
  // dispatch({
  //   type: NOTES_CREATE_REQUEST
  // });
  client.post('/api/v1/notes.json', params, { headers: { 'X-CSRF-TOKEN': token }})
    .then((response) => {
      // dispatch({
      //   type: NOTES_CREATE_SUCCESS,
      //   payload: response.data.data
      // });
    })
    .catch((error) => {
      // dispatch({
      //   type: NOTES_CREATE_FAILURE,
      //   payload: error.message
      // });
    })
};

export const resetNote = () => (dispatch) => {
  // dispatch({
  //   type: NOTES_RESET
  // });
}
