import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Text, TouchableOpacity, View, StyleSheet,
} from 'react-native';
import Modal from 'react-native-modal';
import chroma from 'chroma-js';
import { editBackgroundColor, resetNewSet } from '../../actions/newSet';

import {
  newSetPaletteColor, $white, $black, $lightBlue,
} from '../../utils/colors';

class SetBgColorEditor extends PureComponent {
  static propTypes = {
    backgroundColor: PropTypes.string.isRequired,
    navigation: PropTypes.object.isRequired,
    submitNewBackgroundColor: PropTypes.func.isRequired,
    toggleModalSetBgColor: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
  }

  state = {
    newBackgroundColor: '',
  };

  componentDidMount() {
    const { submitNewBackgroundColor } = this.props;

    submitNewBackgroundColor(newSetPaletteColor[0]);
  }

  componentWillReceiveProps(nextProps) {
    const { newBackgroundColor } = this.state;
    const { backgroundColor } = nextProps;

    if (backgroundColor !== newBackgroundColor) {
      this.setState(() => ({ newBackgroundColor: backgroundColor }));
    }
  }

  onCloseModal = () => {
    const { newBackgroundColor } = this.state;
    const { toggleModalSetBgColor, navigation, submitNewBackgroundColor } = this.props;

    submitNewBackgroundColor(newBackgroundColor);
    resetNewSet();
    navigation.setParams({ backgroundColor: newBackgroundColor });

    toggleModalSetBgColor();
  }

  onChangeColor = color => this.setState({ newBackgroundColor: color })

  createPaletteColor = newBackgroundColor => newSetPaletteColor.map((color) => {
    const colorStyles = {
      ...styles.color,
      backgroundColor: color,
      borderColor: color === newBackgroundColor ? chroma(color).darken(1.5).hex() : color,
    };

    return (
      <TouchableOpacity
        key={color}
        activeOpacity={0.75}
        onPress={() => this.onChangeColor(color)}
        style={colorStyles}
      />
    );
  })

  render() {
    const { newBackgroundColor } = this.state;
    const { visible } = this.props;

    const paletteColor = this.createPaletteColor(newBackgroundColor);
    return (
      <Modal
        animationIn="fadeIn"
        animationOut="fadeOut"
        backdropColor={$black}
        backdropOpacity={0.5}
        isVisible={visible}
        onBackButtonPress={this.onCloseModal}
        onBackdropPress={this.onCloseModal}
      >
        <View style={styles.modalContent}>
          <Text style={styles.editText}>EDIT BACKGROUND COLOR</Text>
          <View style={styles.paletteContainer}>
            {paletteColor}
          </View>
          <View style={styles.closeTextContainer}>
            <TouchableOpacity
              activeOpacity={0.75}
              onPress={this.onCloseModal}
            >
              <Text style={styles.closeText}>SAVE</Text>
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
    flexWrap: 'wrap',
    marginLeft: 10,
  },
  color: {
    borderWidth: 4,
    borderRadius: 100,
    width: 55,
    height: 55,
    margin: 10,
  },
  closeTextContainer: {
    width: '100%',
    alignItems: 'flex-end',
    marginTop: 25,
  },
  closeText: {
    fontSize: 14,
    fontWeight: '600',
    color: $lightBlue,
    paddingRight: 20,
  },
});

const mapStateToProps = ({ newSet }) => ({
  backgroundColor: newSet.backgroundColor,
});

const mapDispatchToProps = dispatch => ({
  submitNewBackgroundColor: newBackgroundColor => dispatch(editBackgroundColor(newBackgroundColor)),
  resetNewSet: () => dispatch(resetNewSet()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SetBgColorEditor);