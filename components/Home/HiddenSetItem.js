import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import chroma from 'chroma-js';

import { $white } from '../../utils/colors';

const HiddenSetItem = (props) => {
  const { backgroundColor } = props;

  const color = chroma(backgroundColor).darken(0.75).hex();

  const rowBackStyle = {
    ...styles.rowBack,
    backgroundColor: color,
  };

  return (
    <View style={rowBackStyle}>
      <TouchableOpacity activeOpacity={0.8} style={styles.iconContainer}>
        <AntDesign color={$white} name="delete" size={30} />
      </TouchableOpacity>
    </View>
  );
};

HiddenSetItem.propTypes = {
  backgroundColor: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  rowBack: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderRadius: 3,
  },
  iconContainer: {
    width: 75,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default HiddenSetItem;
