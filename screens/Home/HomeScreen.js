import React, { PureComponent } from 'react';

import {
  View, ScrollView, Text, StyleSheet,
} from 'react-native';

import { $white, $lightRed } from '../../utils/colors';

class HomeScreen extends PureComponent {
  static navigationOptions = () => ({
    title: 'Home',
    headerStyle: {
      backgroundColor: $lightRed,
    },
    headerTintColor: $white,
  });

  render() {
    return (
      <View style={styles.homeContainer}>
        <ScrollView style={styles.contentContainer}>
          <Text>HOME</Text>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: $white,
  },
});

export default HomeScreen;
