import React, { PureComponent } from 'react';
import { Constants } from 'expo';

import {
  View, ScrollView, Text, StyleSheet,
} from 'react-native';

import { $white, $darkBlue } from '../../utils/colors';

class NewSetScreen extends PureComponent {
  static navigationOptions = () => ({
    title: 'New Set',
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
