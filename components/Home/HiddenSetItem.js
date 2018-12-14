import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Ripple from 'react-native-material-ripple';

import { $white } from '../../utils/colors';

const HiddenSetItem = ({ backgroundColor, color }) => {
  const rowBackStyle = {
    ...styles.rowBack,
    backgroundColor,
  };

  return (
    <View style={rowBackStyle}>
      <Ripple rippleCentered rippleColor={color} style={styles.iconContainer}>
        <AntDesign color={$white} name="delete" size={25} />
      </Ripple>
    </View>
  );
};

const styles = StyleSheet.create({
  rowBack: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  iconContainer: {
    width: 75,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

HiddenSetItem.propTypes = {
  backgroundColor: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default HiddenSetItem;
