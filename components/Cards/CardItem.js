import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Animated, Text, StyleSheet } from 'react-native';

class CardItem extends PureComponent {
  static propTypes = {
    backText: PropTypes.string.isRequired,
    bgColor: PropTypes.string.isRequired,
    cardId: PropTypes.string.isRequired,
    frontText: PropTypes.string.isRequired,
    textColor: PropTypes.string.isRequired,
  }

  state = {
    side: 'front', // front or back
    cardWidth: 0,
    cardHeight: 0,
  }

  scale = new Animated.Value(0.5);

  opacity = new Animated.Value(0);

  componentDidMount() {
    Animated.parallel([
      Animated.timing(
        this.scale,
        {
          toValue: 1,
          duration: 500,
        },
      ),
      Animated.timing(
        this.opacity,
        {
          toValue: 1,
          duration: 500,
        },
      ),
    ]).start();
  }

  getDimensions = (event) => {
    const { width, height } = event.nativeEvent.layout;
    this.setState(() => ({
      cardWidth: width,
      cardHeight: height,
    }));
  }

  render() {
    const { cardWidth, cardHeight } = this.state;
    const {
      cardId,
      bgColor,
      textColor,
      frontText,
      backText,
    } = this.props;

    const cardBgColor = {
      backgroundColor: bgColor,
      transform: [{ scale: this.scale }],
      opacity: this.opacity,
    };

    const fontSize = Math.sqrt(cardWidth * cardHeight / (frontText.length));
    const cardFontSize = fontSize > 35 ? 35 : fontSize;

    const cardTextStyles = {
      color: textColor,
      fontSize: cardFontSize,
    };

    return (
      <Animated.View onLayout={this.getDimensions} style={[styles.container, cardBgColor]}>
        <Text style={[styles.text, cardTextStyles]}>{frontText}</Text>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '80%',
    marginTop: '20%',
    borderRadius: 3,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
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
