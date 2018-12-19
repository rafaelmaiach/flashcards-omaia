import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
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
  static propTypes = {
    createTempSetCards: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired,
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

  render() {
    const { titleModalVisible, setBgColorModalVisible } = this.state;
    const { createTempSetCards } = this.props;

    return (
      <Fragment>
        <TitleModalEditor
          toggleModalTitle={this.toggleModalTitle}
          visible={titleModalVisible}
        />
        <ColorPalette
          toggleModalSetBgColor={this.toggleModalSetBgColor}
          visible={setBgColorModalVisible}
        />
        <View style={styles.container}>
          <CardsList />
          <TouchableOpacity onPress={createTempSetCards}>
            <Text>Add Card</Text>
          </TouchableOpacity>
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

const mapDispatchToProps = dispatch => ({
  createTempSetCards: () => dispatch(addCardNewSet()),
});

export default connect(null, mapDispatchToProps)(NewSetScreen);
