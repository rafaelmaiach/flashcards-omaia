import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import { createSet } from '../../actions/sets';
import { addCardNewSet } from '../../actions/newSet';

import {
  Left,
  RightMenu,
  NewSetFooter,
  TitleModalEditor,
  ColorPalette,
  CardsList,
} from '../../components/NewSet';

import { $white, newSetPaletteColor } from '../../utils/colors';
import commonNavigationOptions from '../commonNavigationOptions';

class NewSetScreen extends PureComponent {
  static defaultProps = {
    backgroundColor: '',
    title: '',
  }

  static propTypes = {
    backgroundColor: PropTypes.string,
    cards: PropTypes.arrayOf(PropTypes.object).isRequired,
    createTempSetCards: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired,
    submitNewSet: PropTypes.func.isRequired,
    title: PropTypes.string,
  }

  static navigationOptions = ({ navigation }) => {
    const title = navigation.getParam('title');
    const bgColor = navigation.getParam('backgroundColor');

    return ({
      ...commonNavigationOptions,
      title: title || 'New Set',
      headerRight: <RightMenu navigation={navigation} />,
      headerLeft: <Left navigation={navigation} />,
      headerStyle: {
        ...commonNavigationOptions.headerStyle,
        backgroundColor: bgColor || newSetPaletteColor[0],
      },
    });
  }

  state = {
    titleModalVisible: false,
    setBgColorModalVisible: false,
  }

  componentDidMount() {
    const { navigation } = this.props;

    navigation.setParams({
      backgroundColor: newSetPaletteColor[0],
      toggleModalTitle: this.toggleModalTitle,
      toggleModalSetBgColor: this.toggleModalSetBgColor,
    });
  }

  toggleModalTitle = () => this.setState(prev => ({ titleModalVisible: !prev.titleModalVisible }));

  toggleModalSetBgColor = () => this.setState(prev => ({
    setBgColorModalVisible: !prev.setBgColorModalVisible,
  }));

  submitSet = () => {
    const {
      id, title, backgroundColor, cards, navigation, submitNewSet,
    } = this.props;
    const bgColor = backgroundColor || navigation.getParam('backgroundColor');

    const newSet = {
      id,
      title,
      createdDate: Date.now(),
      backgroundColor: bgColor,
      isDeleted: false,
      cards: [],
    };

    submitNewSet(newSet);
  }

  render() {
    const { titleModalVisible, setBgColorModalVisible } = this.state;
    const {
      id, cards, navigation, createTempSetCards,
    } = this.props;

    return (
      <Fragment>
        <TitleModalEditor
          navigation={navigation}
          toggleModalTitle={this.toggleModalTitle}
          visible={titleModalVisible}
        />
        <ColorPalette
          navigation={navigation}
          toggleModalSetBgColor={this.toggleModalSetBgColor}
          visible={setBgColorModalVisible}
        />
        <View style={styles.container}>
          <CardsList cards={cards} />
          <TouchableOpacity onPress={createTempSetCards}>
            <Text>Add Card</Text>
          </TouchableOpacity>
          <NewSetFooter navigation={navigation} submitSet={this.submitSet} />
        </View>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 5,
    backgroundColor: $white,
  },
});

const mapStateToProps = ({ newSet }) => {
  const {
    id, title, backgroundColor, cards,
  } = newSet;

  return {
    id,
    title,
    backgroundColor,
    cards: Object.values(cards),
  };
};

const mapDispatchToProps = dispatch => ({
  submitNewSet: newSet => dispatch(createSet(newSet)),
  createTempSetCards: () => dispatch(addCardNewSet()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewSetScreen);
