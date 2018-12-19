import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FlatList, StyleSheet } from 'react-native';
import CardItem from './CardItem';

class CardsList extends PureComponent {
  static propTypes = {
    cards: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  keyExtractor = item => item.id;

  renderItem = ({ item }) => <CardItem {...item} />;

  render() {
    const { cards } = this.props;

    return (
      <FlatList
        contentContainerStyle={styles.container}
        data={cards}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    margin: 20,
  },
});

const mapStateToProps = ({ newSet }) => {
  const { cards } = newSet;

  return {
    cards: Object.values(cards),
  };
};

export default connect(mapStateToProps)(CardsList);
