import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';

import store from './store';
// import { fetchAreas } from './features/areas/areasSlice';
// import { fetchAreas } from './features/areas/areasSlice';

// store.dispatch(fetchAreas());

document.addEventListener('DOMContentLoaded', () => {
  const rootElement = document.getElementById('root');

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    rootElement
  );
});
