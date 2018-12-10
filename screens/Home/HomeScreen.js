import React, { PureComponent } from 'react';
import {
  View, ScrollView, Text, StyleSheet,
} from 'react-native';
import { Constants } from 'expo';

import { $white, $darkBlue } from '../../utils/colors';

class HomeScreen extends PureComponent {
  static navigationOptions = () => ({
    title: 'Home',
    headerStyle: {
      height: 10,
      backgroundColor: $darkBlue,
    },
    headerTitleStyle: {
      marginTop: -Constants.statusBarHeight + 10,
    },
    headerTintColor: $white,
  });

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.contentContainer}>
          <Text>HOME</Text>
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

export default HomeScreen;
