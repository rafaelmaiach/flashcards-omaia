import React, { PureComponent } from 'react';
import {
  View, FlatList, StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import commonNavigationOptions from '../commonNavigationOptions';

import SetItem from '../../components/Home/SetItem';

class HomeScreen extends PureComponent {
  static navigationOptions = {
    ...commonNavigationOptions,
    title: 'Home',
  };

  keyExtractor = item => `${item.id}`;

  renderItem = ({ item }) => (
    <SetItem
      {...item}
      onPressItem={id => console.log(id)}
    />
  )

  render() {
    const { sets } = this.props;

    const allSets = Object.values(sets.byId);

    return (
      <View style={styles.container}>
        <FlatList
          data={allSets}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

const mapStateToProps = state => ({
  sets: state.sets,
});

export default connect(mapStateToProps)(HomeScreen);
