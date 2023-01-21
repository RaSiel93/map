import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import { API_URL } from 'constants';

const useDrag = () => {
  const token = Cookies.get('csrf_token');

  const handleDragOver = (event) => {
    event.preventDefault()
    event.stopPropagation()
  }

  const handleDrop = (event) => {
    event.preventDefault()
    event.stopPropagation()

    const files = event.dataTransfer.files

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

  useEffect(() => {
    document.addEventListener('dragover', handleDragOver)
    document.addEventListener('drop', handleDrop)

    return () => {
      document.removeEventListener('dragover', handleDragOver)
      document.removeEventListener('drop', handleDrop)
    }
  }, [])
}

export default useDrag
