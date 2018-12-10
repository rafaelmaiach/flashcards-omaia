import React from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';
import { Constants } from 'expo';

const AppStatusBar = ({ backgroundColor, ...props }) => (
  <View style={styles.container(backgroundColor)}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

const styles = StyleSheet.create({
  container: backgroundColor => ({
    backgroundColor,
    height: Constants.statusBarHeight,
  }),
});

export default AppStatusBar;
