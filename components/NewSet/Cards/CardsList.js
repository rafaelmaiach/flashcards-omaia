import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  View, Text, TouchableOpacity, StyleSheet, Dimensions,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import chroma from 'chroma-js';

import CardItem from './CardItem';

import { addCardNewSet } from '../../../actions/newSet';

import { $white, $lightBlue, $grey } from '../../../utils/colors';

/**
 * @class CardList
 * @description Create the list of cards on new set
 */
class CardsList extends PureComponent {
  static propTypes = {
    cards: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  constructor(props) {
    super(props);

    const { width } = Dimensions.get('window');

    this.sliderWidth = width;
    this.sliderItemWidth = width * 0.8;
  }

  // Scroll to the end of list when a new card is inserted
  componentDidUpdate(prevProps) {
    const { cards } = this.props;

    if (cards.length < prevProps.cards.length) {
      return true;
    }

    if (cards.length > prevProps.cards.length) {
      this.scrollToEnd();
      return true;
    }

    return false;
  }

  keyExtractor = item => item.id;

  renderItem = ({ item }) => <CardItem {...item} />;

  createCard = () => {
    const { createTempSetCards } = this.props;

    createTempSetCards();

    if (this.carousel) {
      this.carousel.snapToItem(0);
    }
  }

  scrollToEnd = () => {
    if (this.carousel) {
      const { cards } = this.props;
      this.carousel.snapToItem(cards.length - 1);
    }
  }

  render() {
    const { cards, bgColor } = this.props;

    const darkBgColor = bgColor ? chroma(bgColor).darken(1).hex() : bgColor;
    const addCardButtonBgColor = {
      backgroundColor: darkBgColor,
    };

    return (
      <View style={styles.container}>
        <View style={styles.carouselContainer}>
          <Carousel
            ref={(c) => { this.carousel = c; }}
            data={cards}
            horizontal
            inactiveSlideOpacity={0}
            itemWidth={this.sliderItemWidth}
            renderItem={this.renderItem}
            sliderWidth={this.sliderWidth}
          />
        </View>
        <View style={styles.addCardContainer}>
          <TouchableOpacity
            activeOpacity={0.75}
            onPress={this.createCard}
            style={[styles.addCardButton, addCardButtonBgColor]}
          >
            <Text style={styles.addCardText}>Add Card</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  carouselContainer: {
    height: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '10%',
  },
  addCardContainer: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: $white,
    borderBottomWidth: 0.25,
    borderColor: $grey,
  },
  addCardButton: {
    backgroundColor: $lightBlue,
    width: '30%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  addCardText: {
    fontSize: 16,
    fontWeight: '600',
    color: $white,
  },
});

const mapStateToProps = ({ newSet }) => {
  const { cards, backgroundColor } = newSet;

  return {
    bgColor: backgroundColor,
    cards: Object.values(cards),
  };
};

const mapDispatchToProps = dispatch => ({
  createTempSetCards: () => dispatch(addCardNewSet()),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(CardsList);
