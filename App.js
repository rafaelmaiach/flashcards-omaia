import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';

import store from './store';
import { $darkBlue } from './utils/colors';
import StatusBar from './components/StatusBar';
import MainNavigation from './routes/MainNavigation';

const App = () => (
  <Provider store={store}>
    <View style={styles.container}>
      <StatusBar backgroundColor={$darkBlue} barStyle="light-content" />
      <MainNavigation />
    </View>
  </Provider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
