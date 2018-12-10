import React, { PureComponent } from 'react';

import {
  View, ScrollView, Text, StyleSheet,
} from 'react-native';

import { $white, $lightRed } from '../../utils/colors';

class NewSetScreen extends PureComponent {
  static navigationOptions = () => ({
    title: 'New Set',
    headerStyle: {
      backgroundColor: $lightRed,
    },
    headerTintColor: $white,
  });

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.contentContainer}>
          <Text>NEW SET</Text>
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

export default NewSetScreen;
