import React, { PureComponent } from 'react';
import { Constants } from 'expo';

import {
  View, ScrollView, Text, StyleSheet, Platform,
} from 'react-native';

import { $white, $darkBlue } from '../../utils/colors';

class NewFolderScreen extends PureComponent {
  static navigationOptions = () => {
    const height = Platform.OS === 'ios' ? 10 : 30;
    const margin = Platform.OS === 'ios' ? 10 : 0;

    return ({
      title: 'New Folder',
      headerStyle: {
        height,
        backgroundColor: $darkBlue,
      },
      headerTitleStyle: {
        marginTop: -Constants.statusBarHeight + margin,
      },
      headerTintColor: $white,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.contentContainer}>
          <Text>NEW FOLDER</Text>
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

export default NewFolderScreen;
