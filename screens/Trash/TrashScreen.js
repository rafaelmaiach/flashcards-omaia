import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { $lightRed, $white } from '../../utils/colors';

class TrashScreen extends PureComponent {
  static navigationOptions = () => ({
    title: 'Trash',
    headerStyle: {
      backgroundColor: $lightRed,
    },
    headerTintColor: $white,
  });

  render() {
    return (
      <View style={styles.trashContainer}>
        <Text>Trash Screen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  trashContainer: {
    flex: 1,
    backgroundColor: $white,
  },
});

export default TrashScreen;
