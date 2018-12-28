import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { FlatList } from 'react-native';

import SetViewCardItem from './SetViewCardItem';

class SetViewCardList extends PureComponent {
  static propTypes = {
    cards: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  keyExtractor = item => item.id;

  renderItem = ({ item }) => <SetViewCardItem {...item} />;

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

export default SetViewCardList;
