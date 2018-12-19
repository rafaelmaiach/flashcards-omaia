import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FlatList } from 'react-native';
import CardItem from '../CardItem/CardItem';

class CardsList extends PureComponent {
  static propTypes = {
    cards: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  keyExtractor = item => item.id;

  renderItem = ({ item }) => <CardItem {...item} />;

  render() {
    const { cards } = this.props;

    return (
      <FlatList
        data={cards}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
      />
    );
  }
}

const mapStateToProps = ({ newSet }) => {
  const { cards } = newSet;

  return {
    cards: Object.values(cards),
  };
};

export default connect(mapStateToProps)(CardsList);
