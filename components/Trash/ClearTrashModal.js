import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { editBackgroundColor } from '../../actions/newSet';

import { $white, $black } from '../../utils/colors';

class ClearTrashModal extends PureComponent {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
  }

  render() {
    const { visible } = this.props;

    return (
      <Modal
        animationIn="fadeIn"
        animationOut="fadeOut"
        backdropColor={$black}
        backdropOpacity={0.5}
        isVisible={visible}
      >
        <View style={styles.modalContent} />
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

const mapDispatchToProps = dispatch => ({
  submitNewBackgroundColor: newBackgroundColor => dispatch(editBackgroundColor(newBackgroundColor)),
});

export default connect(null, mapDispatchToProps)(ClearTrashModal);
