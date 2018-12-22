import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  View, StyleSheet, TouchableOpacity, Text,
} from 'react-native';
import Modal from 'react-native-modal';
import { TriangleColorPicker, fromHsv } from 'react-native-color-picker';
import {
  editCardBackgroundColor,
  editCardForegroundColor,
} from '../../../actions/newSet';

import {
  $white, $black, $lightBlue, $lightRed, $darkGreen,
} from '../../../utils/colors';

class CardItemColors extends PureComponent {
  static propTypes = {
    bgColor: PropTypes.string.isRequired,
    cardId: PropTypes.string.isRequired,
    changeBackgroundColor: PropTypes.func.isRequired,
    changeForegroundColor: PropTypes.func.isRequired,
    isBackgroundModal: PropTypes.bool.isRequired,
    textColor: PropTypes.string.isRequired,
    toggleModalColors: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props);

    const { isBackgroundModal, bgColor, textColor } = props;

    this.state = {
      color: isBackgroundModal ? bgColor : textColor,
    };
  }

  onCloseModal = () => {
    const { color } = this.state;
    const {
      cardId, isBackgroundModal, toggleModalColors, changeBackgroundColor, changeForegroundColor,
    } = this.props;

    const colorHex = fromHsv(color);

    if (isBackgroundModal) {
      changeBackgroundColor(cardId, colorHex);
    } else {
      changeForegroundColor(cardId, colorHex);
    }

    toggleModalColors();
  }

  onCancelModal = () => {
    const { toggleModalColors } = this.props;
    toggleModalColors();
  }

  onColorChange = color => this.setState(() => ({ color }));

  render() {
    const { color } = this.state;
    const {
      bgColor,
      isBackgroundModal,
      textColor,
      visible,
    } = this.props;

    const modalTitle = isBackgroundModal ? 'EDIT CARD BACKGROUND COLOR' : 'EDIT CARD TEXT COLOR';

    const colorType = isBackgroundModal ? bgColor : textColor;
    const oldColor = colorType;
    const currColor = color || colorType;

    return (
      <Modal
        animationIn="fadeIn"
        animationOut="fadeOut"
        backdropColor={$black}
        backdropOpacity={0.5}
        isVisible={visible}
        onBackButtonPress={this.onCancelModal}
        onBackdropPress={this.onCancelModal}
      >
        <View style={styles.modalContent}>
          <Text style={styles.editText}>{modalTitle}</Text>
          <View style={styles.paletteContainer}>
            <TriangleColorPicker
              color={currColor}
              oldColor={oldColor}
              onColorChange={this.onColorChange}
              style={styles.colorPicker}
            />
          </View>
          <View style={styles.closeTextContainer}>
            <TouchableOpacity
              activeOpacity={0.75}
              onPress={this.onCancelModal}
            >
              <Text style={[styles.closeText, styles.closeTextCancel]}>
                CANCEL
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.75}
              onPress={this.onCloseModal}
            >
              <Text style={styles.closeText}>
                SAVE
              </Text>
            </TouchableOpacity>
          </View>
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
  editText: {
    fontSize: 12,
    letterSpacing: 2,
    color: $lightBlue,
    fontWeight: '800',
    margin: 20,
  },
  paletteContainer: {
    flexDirection: 'row',
    width: '100%',
    height: '75%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  colorPicker: {
    flex: 1,
  },
  closeTextContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 25,
  },
  closeText: {
    fontSize: 14,
    fontWeight: '600',
    color: $darkGreen,
    paddingRight: 20,
  },
  closeTextCancel: {
    color: $lightRed,
  },
});

const mapDispatchToProps = dispatch => ({
  changeBackgroundColor: (id, color) => dispatch(editCardBackgroundColor(id, color)),
  changeForegroundColor: (id, color) => dispatch(editCardForegroundColor(id, color)),
});

const connector = connect(null, mapDispatchToProps);
export default connector(CardItemColors);
