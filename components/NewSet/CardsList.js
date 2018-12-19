import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { FlatList, Text } from 'react-native';
import CardItem from '../CardItem/CardItem';

class CardsList extends PureComponent {
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

export default CardsList;
