import React from 'react';
import { connect } from 'react-redux';
import { View, StatusBar, StyleSheet } from 'react-native';
import { Constants } from 'expo';
import chroma from 'chroma-js';

/**
 * @function AppStatusBar
 * @param {object} props - Status bar props
 * @description Create a custom status bar
 */
const AppStatusBar = ({ backgroundColor, bgColor, ...props }) => {
  const color = bgColor ? chroma(bgColor).darken(1.5).hex() : backgroundColor;

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

const mapStateToProps = ({ statusBar }) => ({
  bgColor: statusBar.backgroundColor,
});

export default connect(mapStateToProps)(AppStatusBar);
