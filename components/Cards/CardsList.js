import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  View, Text, TouchableOpacity, StyleSheet, Dimensions,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { addCardNewSet } from '../../actions/newSet';
import { $white, $lightBlue } from '../../utils/colors';

import CardItem from './CardItem';

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

  keyExtractor = item => item.id;

  renderItem = ({ item }) => <CardItem {...item} />;

  createCard = () => {
    const { createTempSetCards } = this.props;

    createTempSetCards();

    if (this.carousel) {
      this.carousel.snapToItem(0);
    }
  }

  render() {
    const { cards } = this.props;

    return (
      <View style={styles.container}>
        <Carousel
          ref={(c) => { this.carousel = c; }}
          data={cards}
          horizontal
          inactiveSlideOpacity={0.5}
          inactiveSlideScale={0.9}
          itemWidth={this.sliderItemWidth}
          renderItem={this.renderItem}
          sliderWidth={this.sliderWidth}
        />
        <View style={styles.addCardContainer}>
          <TouchableOpacity
            onPress={this.createCard}
            style={styles.addCardButton}
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
  },
  addCardContainer: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: $white,
  },
  addCardButton: {
    backgroundColor: $lightBlue,
    width: '30%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  addCardText: {
    fontSize: 16,
    fontWeight: '600',
    color: $white,
  },
});

const mapStateToProps = ({ newSet }) => {
  const { cards } = newSet;

  return {
    cards: Object.values(cards).reverse(),
  };
};

const mapDispatchToProps = dispatch => ({
  createTempSetCards: () => dispatch(addCardNewSet()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CardsList);
