import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';

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

  render() {
    const { cards } = this.props;

    return (
      <Carousel
        ref={(c) => { this.carousel = c; }}
        data={cards}
        inactiveSlideOpacity={0}
        itemWidth={this.sliderItemWidth}
        renderItem={this.renderItem}
        sliderWidth={this.sliderWidth}
      />
    );
  }
}

export default CardsList;
