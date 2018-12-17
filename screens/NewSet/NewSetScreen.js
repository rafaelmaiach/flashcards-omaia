import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  View, ScrollView, Text, StyleSheet,
} from 'react-native';
import uuidv4 from 'uuid/v4';
import { createSet } from '../../actions/sets';

import { $white, newSetPaletteColor } from '../../utils/colors';
import commonNavigationOptions from '../commonNavigationOptions';

import {
  Left,
  RightMenu,
  NewSetFooter,
  TitleModalEditor,
  ColorPalette,
} from '../../components/NewSet';

class NewSetScreen extends PureComponent {
  static defaultProps = {
    backgroundColor: '',
    title: '',
  }

  static propTypes = {
    backgroundColor: PropTypes.string,
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
      title, backgroundColor, navigation, submitNewSet,
    } = this.props;
    const bgColor = backgroundColor || navigation.getParam('backgroundColor');

    const newSet = {
      id: uuidv4(),
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
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
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
        <ScrollView style={styles.contentContainer}>
          <Text> TEXT </Text>
        </ScrollView>
        <NewSetFooter navigation={navigation} submitSet={this.submitSet} />
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
});

const mapStateToProps = ({ newSet }) => {
  const { title, backgroundColor } = newSet;

  return {
    title,
    backgroundColor,
  };
};

const mapDispatchToProps = dispatch => ({
  submitNewSet: newSet => dispatch(createSet(newSet)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewSetScreen);
