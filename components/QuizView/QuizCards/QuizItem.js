import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Animated, View, Text, StyleSheet,
} from 'react-native';
import CardFlip from 'react-native-card-flip';
import chroma from 'chroma-js';

import { normalizeFontSize } from '../../../utils/helpers';

import QuizFooter from './QuizFooter';

class CardItem extends PureComponent {
  static propTypes = {
    backgroundColor: PropTypes.string.isRequired,
    backText: PropTypes.string.isRequired,
    foregroundColor: PropTypes.string.isRequired,
    frontText: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      side: 'front', // front or back
      cardWidth: 0,
      cardHeight: 0,
    };
  }

  getDimensions = (event) => {
    const { width, height } = event.nativeEvent.layout;

    this.setState(() => ({
      cardWidth: width,
      cardHeight: height,
    }));
  }

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
      side, cardWidth, cardHeight,
    } = this.state;

    const {
      id,
      backgroundColor,
      foregroundColor,
      frontText,
      backText,
      ...rest
    } = this.props;

    const cardInfo = {
      id, backgroundColor, foregroundColor, frontText, backText,
    };

    const textLength = side === 'front' ? frontText.length : backText.length;
    const cardFontSize = normalizeFontSize(textLength, cardWidth, cardHeight);


    const flipTextStyles = {
      ...styles.flipText,
      color: foregroundColor,
      fontSize: cardFontSize,
    };

    const frontSideColor = {
      backgroundColor,
    };

    const backSideColor = {
      backgroundColor: chroma(backgroundColor).darken(1).hex(),
    };

    const containerStyles = {
      ...styles.container,
      backgroundColor,
    };

    return (
      <Fragment>
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
            <View style={[styles.flipCard, frontSideColor]}>
              <Text style={flipTextStyles}>{frontText}</Text>
            </View>
            <View style={[styles.flipCard, backSideColor]}>
              <Text style={flipTextStyles}>{backText}</Text>
            </View>
          </CardFlip>
        </Animated.View>
        <QuizFooter
          cardInfo={cardInfo}
          flipCard={this.flipCard}
          side={side}
          {...rest}
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

export default CardItem;
