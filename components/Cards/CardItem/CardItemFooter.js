import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Animated, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import chroma from 'chroma-js';
import cardShowAnimation from './animation';
import { $white } from '../../../utils/colors';
import CardItemColors from './CardItemColors';

class CardItemFooter extends PureComponent {
  static propTypes = {
    bgColor: PropTypes.string.isRequired,
    flipCard: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    side: PropTypes.string.isRequired,
    textColor: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      modalColorsVisible: false,
      isBackgroundModal: true, // true for background action and false for foreground color
    };

    this.scale = new Animated.Value(0.5);
    this.opacity = new Animated.Value(0);
  }

  componentDidMount() {
    cardShowAnimation(this.scale, this.opacity).start();
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

  render() {
    const { modalColorsVisible, isBackgroundModal } = this.state;
    const {
      id, side, bgColor, textColor, flipCard,
    } = this.props;

    const cardAppearAnimation = {
      transform: [{ scale: this.scale }],
      opacity: this.opacity,
    };

    const footerStyles = {
      ...styles.footerContainer,
      ...cardAppearAnimation,
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
          toggleModalColors={this.toggleModalColors}
          visible
        />
        )}
        <Animated.View style={footerStyles}>
          <TouchableOpacity activeOpacity={0.75} onPress={openForegroundModal}>
            <MaterialIcons color={$white} name="format-color-text" size={30} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.75} onPress={openBackgroundModal}>
            <MaterialIcons color={$white} name="format-color-fill" size={30} />
          </TouchableOpacity>
          <TouchableOpacity onPress={flipCard}>
            <MaterialIcons activeOpacity={0.75} color={$white} name={flipIcon} size={30} />
          </TouchableOpacity>
        </Animated.View>
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

export default CardItemFooter;
