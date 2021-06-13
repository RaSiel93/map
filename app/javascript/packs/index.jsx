import React from 'react'
import ReactDOM from 'react-dom'
import dotenv from 'dotenv'
import App from '../src/components/App'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
})
