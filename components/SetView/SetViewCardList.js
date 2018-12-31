import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { FlatList } from 'react-native';

import SetViewCardItem from './SetViewCardItem';

/**
 * @class SetViewCardList
 * @description Create the list to show all cards on set view
 */
class SetViewCardList extends PureComponent {
  static propTypes = {
    cards: PropTypes.arrayOf(PropTypes.object).isRequired,
    themeColor: PropTypes.string.isRequired,
  }

  keyExtractor = item => item.id;

  renderItem = ({ item }) => {
    const { themeColor } = this.props;
    return <SetViewCardItem {...item} themeColor={themeColor} />;
  };

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
