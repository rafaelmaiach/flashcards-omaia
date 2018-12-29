import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  View, Text, TouchableOpacity, StyleSheet,
} from 'react-native';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

import { setStatusBarColor } from '../../actions/statusBar';

import Left from '../../components/NewSet/Left';
import CardsViewList from '../../components/SetView/SetViewCardList';
import commonNavigationOptions from '../commonNavigationOptions';

import { $lightBlue, $darkBlue } from '../../utils/colors';

class SetView extends PureComponent {
  static propTypes = {
    changeStatusBarColor: PropTypes.func.isRequired,
    set: PropTypes.object.isRequired,
  }

  static navigationOptions = ({ navigation }) => {
    const title = navigation.getParam('title');
    const bgColor = navigation.getParam('backgroundColor');

    return ({
      ...commonNavigationOptions,
      title,
      headerLeft: <Left isSetView navigation={navigation} />,
      headerStyle: {
        ...commonNavigationOptions.headerStyle,
        backgroundColor: bgColor,
      },
    });
  }

  componentDidMount() {
    const { set, changeStatusBarColor } = this.props;
    changeStatusBarColor(set.backgroundColor);
  }

  render() {
    const { set: { cards } } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.studyContainer}>
          <TouchableOpacity activeOpacity={0.65} style={styles.studyBox}>
            <AntDesign color={$lightBlue} name="windowso" size={30} />
            <Text style={styles.studyBoxText}>
              MATCH
            </Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.65} style={styles.studyBox}>
            <MaterialCommunityIcons color={$lightBlue} name="brain" size={30} />
            <Text style={styles.studyBoxText}>
              QUIZ
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.cardsContainer}>
          <View style={styles.cardsTitleContainer}>
            <Text style={styles.cardsTitleText}>
              {`CARDS: ${cards.length}`}
            </Text>
          </View>
          <View style={styles.cardsBoxContainer}>
            <CardsViewList cards={cards} />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  studyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    height: '30%',
    padding: 25,
  },
  studyBox: {
    width: '45%',
    height: '65%',
    backgroundColor: `${$lightBlue}0D`,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    borderWidth: 3,
    borderColor: $lightBlue,
  },
  studyBoxText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: $lightBlue,
  },
  cardsContainer: {
    paddingLeft: 25,
    paddingRight: 25,
    height: '70%',
  },
  cardsTitleContainer: {
    width: '100%',
    height: '10%',
  },
  cardsTitleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: $darkBlue,
  },
  cardsBoxContainer: {
    width: '100%',
    height: '90%',
  },
});

const mapStateToProps = ({ cards, selectedSet }) => {
  const set = {
    ...selectedSet,
    cards: selectedSet.cards.map(cardId => cards[cardId]),
  };

  return {
    set,
  };
};

const mapDispatchToProps = dispatch => ({
  changeStatusBarColor: color => dispatch(setStatusBarColor(color)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SetView);
