import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Animated, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import CardFlip from 'react-native-card-flip';
import chroma from 'chroma-js';

import CardItemText from './CardItemText';
import CardItemFooter from './CardItemFooter';

import { editCardColor } from '../../../actions/newSet';

import { normalizeFontSize } from '../../../utils/helpers';

/**
 * @class CardItem
 * @description Create the card for new set
 */
class CardItem extends PureComponent {
  static propTypes = {
    backText: PropTypes.string.isRequired,
    bgColor: PropTypes.string.isRequired,
    cardId: PropTypes.string.isRequired,
    changeCardColor: PropTypes.func.isRequired,
    frontText: PropTypes.string.isRequired,
    textColor: PropTypes.string.isRequired,
    themeColor: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      side: 'front', // front or back
      cardWidth: 0,
      cardHeight: 0,
      modalTextVisible: false,
    };
  }

  componentDidMount() {
    const { cardId, bgColor, changeCardColor } = this.props;

    changeCardColor(cardId, bgColor, 'backgroundColor');
  }

  getDimensions = (event) => {
    const { width, height } = event.nativeEvent.layout;
    this.setState(() => ({
      cardWidth: width,
      cardHeight: height,
    }));
  }

  toggleModalText = () => this.setState(prev => ({ modalTextVisible: !prev.modalTextVisible }))

  flipCard = () => {
    if (this.card) {
      this.card.flip();
    }
  }

  onFlipStart = (nextSide) => {
    if (nextSide) {
      this.setState(() => ({ side: 'back' }));
      return;
    }

    this.setState(() => ({ side: 'front' }));
  }

  render() {
    const {
      side, cardWidth, cardHeight, modalTextVisible,
    } = this.state;

    const {
      cardId,
      bgColor,
      textColor,
      frontText,
      backText,
      themeColor,
    } = this.props;

    const textLength = side === 'front' ? frontText.length : backText.length;
    const cardFontSize = normalizeFontSize(textLength, cardWidth, cardHeight);

    const flipTextStyles = {
      ...styles.flipText,
      color: textColor,
      fontSize: cardFontSize,
    };

    const frontSideColor = {
      backgroundColor: bgColor,
    };

    const backSideColor = {
      backgroundColor: chroma(bgColor).darken(1).hex(),

    };

    const containerStyles = {
      ...styles.container,
      backgroundColor: bgColor,
    };

    return (
      <Fragment>
        {modalTextVisible && (
          <CardItemText
            backText={backText}
            cardId={cardId}
            cardSide={side}
            frontText={frontText}
            themeColor={themeColor}
            toggleModalText={this.toggleModalText}
          />
        )}
        <Animated.View
          onLayout={this.getDimensions}
          style={containerStyles}
        >
          <CardFlip
            ref={(card) => { this.card = card; }}
            duration={600}
            flipDirection="x"
            flipZoom={0}
            onFlipStart={this.onFlipStart}
            style={styles.flipCardContainer}
          >
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={this.toggleModalText}
              style={[styles.flipCard, frontSideColor]}
            >
              <Text style={flipTextStyles}>{frontText}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={this.toggleModalText}
              style={[styles.flipCard, backSideColor]}
            >
              <Text style={flipTextStyles}>{backText}</Text>
            </TouchableOpacity>
          </CardFlip>
        </Animated.View>
        <CardItemFooter
          bgColor={bgColor}
          flipCard={this.flipCard}
          id={cardId}
          side={side}
          textColor={textColor}
          themeColor={themeColor}
        />
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '85%',
  },
  flipCardContainer: {
    width: '100%',
    height: '100%',
  },
  flipCard: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  flipText: {
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
});

const mapStateToProps = ({ newSet }, props) => {
  const { id } = props;
  const { cards, backgroundColor } = newSet;

  const card = cards[id];

  const cardId = card.id;
  const bgColor = card.backgroundColor || backgroundColor;
  const textColor = card.foregroundColor;
  const { frontText, backText } = card;

  return {
    cardId,
    bgColor,
    textColor,
    frontText,
    backText,
    themeColor: backgroundColor,
  };
};

const mapDispatchToProps = dispatch => ({
  changeCardColor: (id, color, colorType) => dispatch(editCardColor(id, color, colorType)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CardItem);
