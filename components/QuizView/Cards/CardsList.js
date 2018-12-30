import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';

import CardItem from './CardItem';
import Pagination from './Pagination';

class CardsList extends PureComponent {
  static propTypes = {
    cards: PropTypes.arrayOf(PropTypes.object).isRequired,
    setQuizFinished: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    const { width } = Dimensions.get('window');

    this.state = {
      activeIndex: 0,
    };

    this.sliderWidth = width;
    this.sliderItemWidth = width * 0.8;
  }

  keyExtractor = item => item.id;

  renderItem = ({ item }) => {
    const { activeIndex } = this.state;
    const { cards, setQuizFinished } = this.props;

    return (
      <CardItem
        {...item}
        activeIndex={activeIndex}
        carouselRef={this.carousel}
        quizLength={cards.length}
        setActiveIndex={this.setActiveIndex}
        setQuizFinished={setQuizFinished}
      />
    );
  }

  setActiveIndex = index => this.setState(() => ({ activeIndex: index }));

  render() {
    const { activeIndex } = this.state;
    const { cards } = this.props;

    return (
      <Fragment>
        <Carousel
          ref={(c) => { this.carousel = c; }}
          data={cards}
          inactiveSlideOpacity={0}
          itemWidth={this.sliderItemWidth}
          renderItem={this.renderItem}
          scrollEnabled={false}
          sliderWidth={this.sliderWidth}
        />
        <Pagination activeIndex={activeIndex} length={cards.length} />
      </Fragment>
    );
  }
}

// const mapStateToProps = ({ quiz }) => ({
//   cards: Object.values(quiz),
// });

export default CardsList;
