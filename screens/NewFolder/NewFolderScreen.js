import React, { PureComponent } from 'react';
import {
  View, ScrollView, Text, StyleSheet,
} from 'react-native';
import { $white } from '../../utils/colors';
import commonNavigationOptions from '../commonNavigationOptions';

class NewFolderScreen extends PureComponent {
  static navigationOptions = commonNavigationOptions;

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
