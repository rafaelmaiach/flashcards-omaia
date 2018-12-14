import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { SwipeListView } from 'react-native-swipe-list-view';

import commonNavigationOptions from '../commonNavigationOptions';
import SetItem from '../../components/Home/SetItem';
import HiddenSetItem from '../../components/Home/HiddenSetItem';

class HomeScreen extends PureComponent {
  static navigationOptions = {
    ...commonNavigationOptions,
    title: 'Home',
  };

  keyExtractor = item => `${item.id}`;

  renderItem = ({ item }) => (
    <SetItem
      {...item}
      onPressItem={title => console.log(title)}
    />
  )

  renderHiddenItem = ({ item }) => <HiddenSetItem {...item} />

  shouldRowUpdate = (currItem, newItem) => {
    const titleChanged = currItem.title !== newItem.title;
    const cardsQuantityChanged = currItem.cards.length !== newItem.cards.length;

    return titleChanged || cardsQuantityChanged;
  }

  render() {
    const { sets } = this.props;

    const allSets = Object.values(sets.byId);

    return (
      <View style={styles.container}>
        <SwipeListView
          data={allSets}
          disableRightSwipe
          keyExtractor={this.keyExtractor}
          previewRowKey="1"
          renderHiddenItem={this.renderHiddenItem}
          renderItem={this.renderItem}
          rightOpenValue={-75}
          shouldItemUpdate={this.shouldRowUpdate}
          useFlatList
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
