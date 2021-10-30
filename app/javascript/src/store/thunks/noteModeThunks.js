import { client } from 'src/api/client';
import { toggleMode } from 'src/store/actions';
import { modes } from 'src/constants';

export const createNoteForNoteMode = (params, token) => (dispatch) => {
  client.post('/api/v1/notes.json', params, { headers: { 'X-CSRF-TOKEN': token }})
    .then((response) => {
      dispatch(toggleMode(modes.NOTE));
    })
    .catch((error) => {
      console.log(error);
    })
};
