import React, { PureComponent } from 'react';
import { Text } from 'react-native';

class CardItem extends PureComponent {
  render() {
    const { id } = this.props;
    return (
      <Text>{id}</Text>
    );
  }
}

export default CardItem;
