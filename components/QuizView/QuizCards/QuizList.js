import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';

import { shuffle } from '../../../utils/helpers';

import QuizItem from './QuizItem';
import QuizPagination from './QuizPagination';

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
      shuffledCards: [],
    };

    this.sliderWidth = width;
    this.sliderItemWidth = width * 0.8;
  }

  componentDidMount() {
    this.setupCards();
  }

  setupCards = () => {
    const { cards } = this.props;
    this.setState(() => ({ shuffledCards: shuffle(cards) }));
  }

  keyExtractor = item => item.id;

  renderItem = ({ item, index }) => {
    const { shuffledCards } = this.state;
    const { setQuizFinished } = this.props;

    return (
      <QuizItem
        {...item}
        activeIndex={index}
        carouselRef={this.carousel}
        quizLength={shuffledCards.length}
        setActiveIndex={this.setActiveIndex}
        setQuizFinished={setQuizFinished}
      />
    );
  }

  setActiveIndex = index => this.setState(() => ({ activeIndex: index }));

  render() {
    const { activeIndex, shuffledCards } = this.state;

    return (
      <Fragment>
        <Carousel
          ref={(c) => { this.carousel = c; }}
          data={shuffledCards}
          inactiveSlideOpacity={0}
          itemWidth={this.sliderItemWidth}
          renderItem={this.renderItem}
          scrollEnabled={false}
          sliderWidth={this.sliderWidth}
        />
        <QuizPagination activeIndex={activeIndex} length={shuffledCards.length} />
      </Fragment>
    );
  }
}

export default CardsList;
