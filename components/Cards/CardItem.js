import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';

class CardItem extends PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
  }

  render() {
    const { id } = this.props;
    return (
      <Text>{id}</Text>
    );
  }
}

export default CardItem;
