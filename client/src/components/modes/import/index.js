import { useRef } from 'react'
import styled from 'styled-components';
import { Button } from 'components/common/Button';
import axios from 'axios';
import Cookies from 'js-cookie';
import { API_URL } from 'constants';

const ModeButton = styled(Button)`
  // right: 320px;
  // bottom: 120px;

  &:after {
    // font-size: 30px;
    content: '^';
  }
`;

const ImportMode = (props) => {
  const inputRef = useRef()

  const onClick = () => {
    inputRef.current.click()
  }

  const onChange = (event) => {
    const token = Cookies.get('csrf_token');
    const files = event.target.files

    for (let i = 0; i < files.length; i++) {
      let formData = new FormData();
      formData.append('file', files[i]);

      axios.post(
        `${API_URL}/api/v1/load.json`,
        formData,
        {
          headers: {
            'Content-Type': `multipart/form-data`,
            'X-CSRF-TOKEN': token,
            'withCredentials': true,
          },
        }
      )
    }
  }

  return <>
    <input type="file" multiple hidden ref={inputRef} onChange={onChange}/>
    <ModeButton title="Імпарт" onClick={onClick}/>
  </>
}

export default ImportMode
