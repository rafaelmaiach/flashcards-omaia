import React, { PureComponent } from 'react';
import {
  View, ScrollView, Text, StyleSheet,
} from 'react-native';
import { $white } from '../../utils/colors';
import commonNavigationOptions from '../commonNavigationOptions';

class TrashScreen extends PureComponent {
  static navigationOptions = {
    ...commonNavigationOptions,
    title: 'Trash',
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.contentContainer}>
          <Text>TRASH</Text>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: $white,
  },
});

export default TrashScreen;
