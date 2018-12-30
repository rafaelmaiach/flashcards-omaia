import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  View, StyleSheet, TouchableOpacity, Alert,
} from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import chroma from 'chroma-js';

import { removeCardNewSet } from '../../../actions/newSet';
import { $white } from '../../../utils/colors';

import CardItemColors from './CardItemColors';

class CardItemFooter extends PureComponent {
  static propTypes = {
    bgColor: PropTypes.string.isRequired,
    flipCard: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    removeCard: PropTypes.func.isRequired,
    side: PropTypes.string.isRequired,
    textColor: PropTypes.string.isRequired,
    themeColor: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      modalColorsVisible: false,
      isBackgroundModal: true, // true for background action and false for foreground color
    };
  }

  toggleModalColors = () => this.setState(prev => ({
    modalColorsVisible: !prev.modalColorsVisible,
  }))

  openModal = isBackgroundModal => () => {
    this.setState(prev => ({
      isBackgroundModal,
      modalColorsVisible: !prev.modalColorsVisible,
    }));
  }

  showDeleteCard = () => {
    const { id, removeCard } = this.props;

    Alert.alert(
      'Delete Card?',
      'This will permanently delete this card.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: () => removeCard(id) },
      ],
      { cancelable: false },
    );
  }

  render() {
    const { modalColorsVisible, isBackgroundModal } = this.state;
    const {
      id, side, bgColor, textColor, flipCard, themeColor,
    } = this.props;

    const footerStyles = {
      ...styles.footerContainer,
      backgroundColor: chroma(bgColor).darken(1).hex(),
    };

    const flipIcon = side === 'front' ? 'flip-to-back' : 'flip-to-front';

    const openBackgroundModal = this.openModal(true);
    const openForegroundModal = this.openModal(false);

    return (
      <Fragment>
        {modalColorsVisible && (
        <CardItemColors
          bgColor={bgColor}
          cardId={id}
          isBackgroundModal={isBackgroundModal}
          textColor={textColor}
          themeColor={themeColor}
          toggleModalColors={this.toggleModalColors}
          visible
        />
        )}
        <View style={footerStyles}>
          <TouchableOpacity activeOpacity={0.75} onPress={this.showDeleteCard}>
            <FontAwesome color={$white} name="trash" size={30} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.75} onPress={openForegroundModal}>
            <MaterialIcons color={$white} name="format-color-text" size={30} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.75} onPress={openBackgroundModal}>
            <MaterialIcons color={$white} name="format-color-fill" size={30} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.75} onPress={flipCard}>
            <MaterialIcons color={$white} name={flipIcon} size={30} />
          </TouchableOpacity>
        </View>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    height: '15%',
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
  },
});

const mapDispatchToProps = dispatch => ({
  removeCard: id => dispatch(removeCardNewSet(id)),
});

export default connect(null, mapDispatchToProps)(CardItemFooter);
