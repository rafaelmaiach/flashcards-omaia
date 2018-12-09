import React from 'react';
import { Provider } from 'react-redux';

import store from './store';
import MainNavigation from './routes/MainNavigation';

const App = () => (
  <Provider store={store}>
    <MainNavigation />
  </Provider>
);

export default App;
