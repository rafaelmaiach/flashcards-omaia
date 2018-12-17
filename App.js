import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './store';
import { $darkBlue } from './utils/colors';
import StatusBar from './components/StatusBar';
import MainNavigation from './routes/MainNavigation';

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <View style={styles.container}>
        <StatusBar backgroundColor={$darkBlue} barStyle="light-content" />
        <MainNavigation />
      </View>
    </PersistGate>
  </Provider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
