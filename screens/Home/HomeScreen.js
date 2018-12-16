import React, { PureComponent } from 'react';
import {
  View, FlatList, Text, StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import { $darkBlue, $white } from '../../utils/colors';

import commonNavigationOptions from '../commonNavigationOptions';
import SetItem from '../../components/Home/SetItem';

class HomeScreen extends PureComponent {
  static navigationOptions = {
    ...commonNavigationOptions,
    title: 'Home',
  };

  keyExtractor = item => `${item.id}`;

  renderItem = ({ item }) => <SetItem {...item} onPressItem={title => console.log(title)} />;

  render() {
    const { sets } = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>SETS</Text>
        <FlatList
          data={sets}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: $white,
  },
  title: {
    color: $darkBlue,
    fontWeight: '600',
    fontSize: 14,
    letterSpacing: 1.7,
    marginBottom: 10,
  },
});

const mapStateToProps = (state) => {
  const { sets } = state;
  const setsById = Object.values(sets.byId);
  const notDeletedSets = setsById.filter(set => !set.isDeleted);

  return {
    sets: notDeletedSets,
  };
};

export default connect(mapStateToProps)(HomeScreen);
