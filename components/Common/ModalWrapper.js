import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';

import ModalFooter from './ModalFooter';

import { $black, $white } from '../../utils/colors';

class ModalWrapper extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    onCancel: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
  }

  render() {
    const {
      visible, children, onCancel, onClose,
    } = this.props;

    return (
      <Modal
        animationIn="fadeIn"
        animationOut="fadeOut"
        backdropColor={$black}
        backdropOpacity={0.5}
        isVisible={visible}
        onBackButtonPress={onCancel}
        onBackdropPress={onCancel}
      >
        <View style={styles.modalContent}>
          {children}
          <ModalFooter onCancel={onCancel} onClose={onClose} />
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modalContent: {
    width: '100%',
    backgroundColor: $white,
    borderRadius: 3,
    padding: 20,
  },
});

export default ModalWrapper;
