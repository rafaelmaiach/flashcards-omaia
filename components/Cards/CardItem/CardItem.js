import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  View, Animated, Text, StyleSheet,
} from 'react-native';

import { cardShowAnimation, cardFlipToFront, cardFlipToBack } from './animations';

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

    this.scale = new Animated.Value(0.5);
    this.opacity = new Animated.Value(0);

    this.flipValue = new Animated.Value(0);
    this.flipPositionValue = 0;

    this.flipValue.addListener(({ value }) => {
      this.flipPositionValue = value;
    });

    this.frontInterpolate = this.flipValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg'],
    });

    this.backInterpolate = this.flipValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg'],
    });
  }

  componentDidMount() {
    cardShowAnimation(this.scale, this.opacity).start();
  }

  getDimensions = (event) => {
    const { width, height } = event.nativeEvent.layout;
    this.setState(() => ({
      cardWidth: width,
      cardHeight: height,
    }));
  }

  flipCard = () => {
    if (this.flipPositionValue >= 90) {
      this.setState(() => ({ side: 'front' }));
      cardFlipToFront(this.flipValue).start();
    } else {
      this.setState(() => ({ side: 'back' }));
      cardFlipToBack(this.flipValue).start();
    }
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

    const commonStyle = {
      opacity: this.opacity,
      backgroundColor: bgColor,
    };

    const frontCardStyles = {
      ...styles.flipCard,
      ...commonStyle,
      transform: [
        { rotateY: this.frontInterpolate },
        { scale: this.scale },
      ],
    };

    const backCardStyles = {
      ...styles.flipCard,
      ...styles.flipCardBack,
      ...commonStyle,
      transform: [
        { rotateY: this.backInterpolate },
        { scale: this.scale },
      ],
    };

    return (
      <View style={styles.container}>
        <View>
          <Animated.View onLayout={this.getDimensions} style={frontCardStyles}>
            <Text style={flipTextStyles}>
              {frontText}
            </Text>
          </Animated.View>
          <Animated.View onLayout={this.getDimensions} style={backCardStyles}>
            <Text style={flipTextStyles}>
              {backText}
            </Text>
          </Animated.View>
        </View>
        <CardItemFooter
          bgColor={bgColor}
          flipCard={this.flipCard}
          id={cardId}
          side={side}
          textColor={textColor}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '85%',
  },
  flipCard: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backfaceVisibility: 'hidden',
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  flipCardBack: {
    position: 'absolute',
    top: 0,
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
