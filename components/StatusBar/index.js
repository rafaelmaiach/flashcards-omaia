import React from 'react';
import { connect } from 'react-redux';
import { View, StatusBar, StyleSheet } from 'react-native';
import { Constants } from 'expo';
import chroma from 'chroma-js';

const AppStatusBar = ({ backgroundColor, bgColor, ...props }) => {
  const color = bgColor ? chroma(bgColor).darken(0.3).hex() : backgroundColor;

  return (
    <View style={styles.container(color)}>
      <StatusBar backgroundColor={backgroundColor} translucent {...props} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: backgroundColor => ({
    backgroundColor,
    height: Constants.statusBarHeight,
  }),
});

const mapStateToProps = ({ newSet }) => ({
  bgColor: newSet.backgroundColor,
});

export default connect(mapStateToProps)(AppStatusBar);
