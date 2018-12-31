import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, StyleSheet, Text } from 'react-native';
import { TriangleColorPicker, fromHsv } from 'react-native-color-picker';

import ModalWrapper from '../../Common/ModalWrapper';

import { editCardColor } from '../../../actions/newSet';

/**
 * @class CardItemColors
 * @description Create the modal to change the card color
 */
class CardItemColors extends PureComponent {
  static propTypes = {
    bgColor: PropTypes.string.isRequired,
    cardId: PropTypes.string.isRequired,
    changeCardColor: PropTypes.func.isRequired,
    isBackgroundModal: PropTypes.bool.isRequired,
    textColor: PropTypes.string.isRequired,
    themeColor: PropTypes.string.isRequired,
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
      cardId,
      toggleModalColors,
      changeCardColor,
      isBackgroundModal,
    } = this.props;

    const colorHex = fromHsv(color);

    const colorType = isBackgroundModal ? 'backgroundColor' : 'foregroundColor';
    changeCardColor(cardId, colorHex, colorType);

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
      themeColor,
    } = this.props;

    const modalTitle = isBackgroundModal ? 'EDIT CARD BACKGROUND COLOR' : 'EDIT CARD TEXT COLOR';

    const colorType = isBackgroundModal ? bgColor : textColor;
    const oldColor = colorType;
    const currColor = color || colorType;

    const editTextTitleStyle = {
      ...styles.editText,
      color: themeColor,
    };

    return (
      <ModalWrapper onCancel={this.onCancelModal} onClose={this.onCloseModal} visible={visible}>
        <Text style={editTextTitleStyle}>{modalTitle}</Text>
        <View style={styles.paletteContainer}>
          <TriangleColorPicker
            color={currColor}
            oldColor={oldColor}
            onColorChange={this.onColorChange}
            onOldColorSelected={this.onColorChange}
            style={styles.colorPicker}
          />
        </View>
      </ModalWrapper>
    );
  }
}

const styles = StyleSheet.create({
  editText: {
    fontSize: 12,
    letterSpacing: 2,
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
});

const mapDispatchToProps = dispatch => ({
  changeCardColor: (id, color, colorType) => dispatch(editCardColor(id, color, colorType)),
});

const connector = connect(null, mapDispatchToProps);
export default connector(CardItemColors);
