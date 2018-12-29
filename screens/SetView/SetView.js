import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  View, Text, TouchableOpacity, StyleSheet,
} from 'react-native';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

import { setStatusBarColor } from '../../actions/statusBar';

import Left from '../../components/NewSet/Left';
import CardsViewList from '../../components/SetView/SetViewCardList';
import ModalNewCard from '../../components/SetView/SetViewModalNewCard';

import commonNavigationOptions from '../commonNavigationOptions';

import { $darkBlue } from '../../utils/colors';

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

  state = {
    modalVisible: false,
  }

  componentDidMount() {
    const { set, changeStatusBarColor } = this.props;
    changeStatusBarColor(set.backgroundColor);
  }

  toggleModalNewCard = () => this.setState(prev => ({ modalVisible: !prev.modalVisible }));

  render() {
    const { modalVisible } = this.state;
    const { set: { id, cards, backgroundColor } } = this.props;

    const colorTheme = { color: backgroundColor };
    const bgColorTheme = { backgroundColor: `${backgroundColor}0D` };
    const borderColorTheme = { borderColor: backgroundColor };

    return (
      <Fragment>
        {modalVisible && (
          <ModalNewCard
            setBackgroundColor={backgroundColor}
            setId={id}
            toggleModalNewCard={this.toggleModalNewCard}
          />
        )}
        <View style={styles.container}>
          <View style={styles.studyContainer}>
            <TouchableOpacity
              activeOpacity={0.65}
              style={[styles.studyBox, bgColorTheme, borderColorTheme]}
            >
              <AntDesign color={backgroundColor} name="windowso" size={30} />
              <Text style={[styles.studyBoxText, colorTheme]}>
                MATCH
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.65}
              style={[styles.studyBox, bgColorTheme, borderColorTheme]}
            >
              <MaterialCommunityIcons color={backgroundColor} name="brain" size={30} />
              <Text style={[styles.studyBoxText, colorTheme]}>
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
              <TouchableOpacity
                activeOpacity={0.65}
                onPress={this.toggleModalNewCard}
                style={[styles.cardBoxNewCardButton, bgColorTheme, borderColorTheme]}
              >
                <Text style={[styles.cardBoxNewCardText, colorTheme]}>Add Card</Text>
              </TouchableOpacity>
              <CardsViewList cards={cards} themeColor={backgroundColor} />
            </View>
          </View>
        </View>
      </Fragment>
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
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    borderWidth: 3,
  },
  studyBoxText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardsContainer: {
    paddingLeft: 30,
    paddingRight: 25,
    height: '70%',
  },
  cardsTitleContainer: {
    width: '100%',
    height: '8%',
  },
  cardsTitleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: $darkBlue,
  },
  cardsBoxContainer: {
    width: '100%',
    height: '92%',
    alignItems: 'center',
  },
  cardBoxNewCardButton: {
    width: '50%',
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    borderRadius: 3,
    borderWidth: 3,
  },
  cardBoxNewCardText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

const mapStateToProps = ({ sets, cards, selectedSet }) => {
  const currentSet = sets.byId[selectedSet.id];

  const set = {
    ...currentSet,
    cards: currentSet.cards.map(cardId => cards[cardId]),
  };

  return {
    set,
  };
};

const mapDispatchToProps = dispatch => ({
  changeStatusBarColor: color => dispatch(setStatusBarColor(color)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SetView);
