import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { FlatList } from 'react-native';
import SetItem from '../SetItem/SetItem';

/**
 * @class SetList
 * @description Create the list of sets for home screen and trash screen
 */
class SetList extends PureComponent {
  static propTypes = {
    sets: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  keyExtractor = item => item.id;

  renderItem = ({ item }) => <SetItem {...item} />;

  render() {
    const { sets } = this.props;

    return (
      <FlatList
        data={sets}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
      />
    );
  }
}

export default SetList;
