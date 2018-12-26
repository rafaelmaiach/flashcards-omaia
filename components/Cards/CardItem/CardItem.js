import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Animated, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import CardFlip from 'react-native-card-flip';
import chroma from 'chroma-js';
import cardShowAnimation from './animations';

import CardItemFooter from './CardItemFooter';

class CardItem extends PureComponent {
  static propTypes = {
    backText: PropTypes.string.isRequired,
    bgColor: PropTypes.string.isRequired,
    cardId: PropTypes.string.isRequired,
    frontText: PropTypes.string.isRequired,
    textColor: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      side: 'front', // front or back
      cardWidth: 0,
      cardHeight: 0,
    };

    this.opacity = new Animated.Value(0);
  }

  componentDidMount() {
    cardShowAnimation(this.opacity).start();
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
    const { side, cardWidth, cardHeight } = this.state;
    const {
      cardId,
      bgColor,
      textColor,
      frontText,
      backText,
    } = this.props;

    const textLength = side === 'front' ? frontText.length : backText.length;
    const fontSize = Math.sqrt(cardWidth * cardHeight / textLength);
    const cardFontSize = fontSize > 35 ? 35 : fontSize;

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
      opacity: this.opacity,
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
            <TouchableOpacity activeOpacity={0.75} style={[styles.flipCard, frontSideColor]}>
              <Text style={flipTextStyles}>{frontText}</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.75} style={[styles.flipCard, backSideColor]}>
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
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
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
  };
};

export default connect(mapStateToProps)(CardItem);
