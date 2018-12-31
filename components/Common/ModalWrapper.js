import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';

import { $black } from '../../utils/colors';

class ModalWrapper extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    onCancel: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
  }

  render() {
    const { visible, children, onCancel } = this.props;

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
        {children}
      </Modal>
    );
  }
}

export default ModalWrapper;
