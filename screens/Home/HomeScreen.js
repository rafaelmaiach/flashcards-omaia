import React, { PureComponent } from 'react';
import {
  View, FlatList, Text, StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import { $white } from '../../utils/colors';
import commonNavigationOptions from '../commonNavigationOptions';

class HomeScreen extends PureComponent {
  static navigationOptions = {
    ...commonNavigationOptions,
    title: 'Home',
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList style={styles.contentContainer}>
          <Text>HOME</Text>
        </FlatList>
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

const mapStateToProps = state => ({
  sets: state.sets,
});

export default connect(mapStateToProps)(HomeScreen);
