import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  View, ScrollView, Text, StyleSheet,
} from 'react-native';
import { $white, $darkBlue } from '../../utils/colors';
import commonNavigationOptions from '../commonNavigationOptions';
import RightMenu from '../../components/NewSet/RightMenu';
import TitleModalEditor from '../../components/NewSet/TitleModalEditor';
import SetBgColorEditor from '../../components/NewSet/SetBgColorEditor';

class NewSetScreen extends PureComponent {
  static defaultProps = {
    backgroundColor: '',
    title: '',
  }

  static propTypes = {
    backgroundColor: PropTypes.string,
    navigation: PropTypes.object.isRequired,
    title: PropTypes.string,
  }

  static navigationOptions = ({ navigation }) => {
    const title = navigation.getParam('title');
    const bgColor = navigation.getParam('backgroundColor');

    return ({
      ...commonNavigationOptions,
      title: title || 'New Set',
      headerRight: <RightMenu navigation={navigation} />,
      headerStyle: {
        ...commonNavigationOptions.headerStyle,
        backgroundColor: bgColor || $darkBlue,
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
      <View style={styles.container}>
        <TitleModalEditor
          navigation={navigation}
          toggleModalTitle={this.toggleModalTitle}
          visible={titleModalVisible}
        />
        <SetBgColorEditor
          navigation={navigation}
          toggleModalSetBgColor={this.toggleModalSetBgColor}
          visible={setBgColorModalVisible}
        />
        <ScrollView style={styles.contentContainer}>
          <Text>NEW SET</Text>
        </ScrollView>
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

export default connect(mapStateToProps)(NewSetScreen);
