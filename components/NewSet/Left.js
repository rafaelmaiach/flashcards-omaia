import React from 'react';
import PropTypes from 'prop-types';
import {
  Text, TouchableOpacity, Platform, StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

import { resetNewSet } from '../../actions/newSet';
import { resetStatusBarColor } from '../../actions/statusBar';
import { $white } from '../../utils/colors';

/**
 * @class Left
 * @description Create the left component on header for new set screen
 * It acts like a back button
 */
const Left = (props) => {
  const {
    navigation, resetNewSetInfo, resetStatusBar, isSetView,
  } = props;

  const onPress = () => {
    if (!isSetView) {
      resetNewSetInfo();
      navigation.goBack();
    }

    resetStatusBar();
    navigation.navigate('HomeScreen');
  };

  return (
    Platform.OS === 'ios'
      ? (
        <TouchableOpacity onPress={onPress} style={styles.button}>
          <Ionicons color={$white} name="ios-arrow-back" size={33} style={styles.icon} />
          <Text style={styles.text}>Home</Text>
        </TouchableOpacity>
      )
      : (
        <TouchableOpacity onPress={onPress} style={styles.button}>
          <MaterialIcons color={$white} name="arrow-back" size={33} />
        </TouchableOpacity>
      )
  );
};

Left.defaultProps = {
  isSetView: false,
};

Left.propTypes = {
  isSetView: PropTypes.bool,
  navigation: PropTypes.object.isRequired,
  resetNewSetInfo: PropTypes.func.isRequired,
  resetStatusBar: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    paddingLeft: 7,
  },
  icon: {
    paddingTop: 4,
    paddingRight: 5,
  },
  text: {
    color: $white,
    letterSpacing: 2,
  },
});

const mapDispatchToProps = dispatch => ({
  resetNewSetInfo: () => dispatch(resetNewSet()),
  resetStatusBar: () => dispatch(resetStatusBarColor()),
});

export default connect(null, mapDispatchToProps)(Left);
