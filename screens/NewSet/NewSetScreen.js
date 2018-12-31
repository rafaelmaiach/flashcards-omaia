import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';

import {
  Left,
  RightMenu,
  NewSetFooter,
  TitleModalEditor,
  SetColorPalette,
} from '../../components/NewSet';

import { setEditionInfo } from '../../actions/newSet';
import { setStatusBarColor } from '../../actions/statusBar';

import CardsList from '../../components/NewSet/Cards/CardsList';

import { $white, newSetPaletteColor } from '../../utils/colors';
import commonNavigationOptions from '../commonNavigationOptions';

class NewSetScreen extends PureComponent {
  static defaultProps = {
    setInfo: null,
  }

  static propTypes = {
    navigation: PropTypes.object.isRequired,
    setInfo: PropTypes.object,
    setupEdition: PropTypes.func.isRequired,
  }

  static navigationOptions = ({ navigation }) => {
    const defaultSetInfo = {
      title: 'New Set',
      backgroundColor: newSetPaletteColor[0],
    };

    const setInfo = navigation.getParam('setInfo') || defaultSetInfo;

    const title = navigation.getParam('title') || setInfo.title;
    const bgColor = navigation.getParam('backgroundColor') || setInfo.backgroundColor;

    return ({
      ...commonNavigationOptions,
      title,
      headerRight: <RightMenu navigation={navigation} />,
      headerLeft: <Left navigation={navigation} />,
      headerStyle: {
        ...commonNavigationOptions.headerStyle,
        backgroundColor: bgColor,
      },
    });
  }

  state = {
    titleModalVisible: false,
    setBgColorModalVisible: false,
  }

  componentDidMount() {
    const { navigation, setInfo, setupEdition } = this.props;

    if (setInfo) {
      setupEdition(setInfo);
    }

    navigation.setParams({
      toggleModalTitle: this.toggleModalTitle,
      toggleModalSetBgColor: this.toggleModalSetBgColor,
    });
  }

  toggleModalTitle = () => this.setState(prev => ({ titleModalVisible: !prev.titleModalVisible }));

  toggleModalSetBgColor = () => this.setState(prev => ({
    setBgColorModalVisible: !prev.setBgColorModalVisible,
  }));

  render() {
    const { titleModalVisible, setBgColorModalVisible } = this.state;
    const { navigation } = this.props;

    return (
      <Fragment>
        <TitleModalEditor
          toggleModalTitle={this.toggleModalTitle}
          visible={titleModalVisible}
        />
        <SetColorPalette
          navigation={navigation}
          toggleModalSetBgColor={this.toggleModalSetBgColor}
          visible={setBgColorModalVisible}
        />
        <View style={styles.container}>
          <CardsList />
          <NewSetFooter />
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

const mapStateToProps = ({ cards }, props) => {
  const { navigation } = props;
  const setInfo = navigation.getParam('setInfo');

  if (!setInfo) {
    return {
      setInfo,
    };
  }

  const setCards = {};

  setInfo.cards.forEach((id) => {
    setCards[id] = {
      ...cards[id],
    };
  });

  const newSetInfo = {
    ...setInfo,
    cards: {
      ...setCards,
    },
  };

  return {
    setInfo: newSetInfo,
  };
};

const mapDispatchToProps = dispatch => ({
  setupEdition: (info) => {
    const { backgroundColor } = info;
    dispatch(setEditionInfo(info));
    dispatch(setStatusBarColor(backgroundColor));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NewSetScreen);
