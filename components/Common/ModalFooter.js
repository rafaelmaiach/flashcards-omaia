import React from 'react';
import PropTypes from 'prop-types';
import {
  View, Text, TouchableOpacity, StyleSheet,
} from 'react-native';

import { $lightRed, $darkGreen } from '../../utils/colors';

/**
 * @function ModalFooter
 * @param {object} props - Modal footer props
 * @description Responsible for close and save the modal information
 * @return ModalFooter component
 */
const ModalFooter = (props) => {
  const { onCancel, onClose } = props;

  return (
    <View style={styles.closeTextContainer}>
      <TouchableOpacity activeOpacity={0.85} onPress={onCancel}>
        <Text style={[styles.closeText, styles.cancelText]}>CANCEL</Text>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.85} onPress={onClose}>
        <Text style={[styles.closeText, styles.saveText]}>SAVE</Text>
      </TouchableOpacity>
    </View>
  );
};

ModalFooter.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  closeTextContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
    paddingRight: 20,
  },
  closeText: {
    fontSize: 14,
    fontWeight: '600',
  },
  cancelText: {
    color: $lightRed,
    paddingRight: 20,
  },
  saveText: {
    color: $darkGreen,
  },
});

export default ModalFooter;
