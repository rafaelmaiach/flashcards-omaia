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

  static navigationOptions = ({ navigation }) => ({
    ...commonNavigationOptions,
    title: navigation.getParam('title') || 'New Set',
    headerRight: <RightMenu navigation={navigation} />,
    headerStyle: {
      ...commonNavigationOptions.headerStyle,
      backgroundColor: navigation.getParam('backgroundColor') || $darkBlue,
    },
  })

  state = {
    modalVisible: false,
  }

  componentDidMount() {
    const { navigation } = this.props;

    navigation.setParams({
      toggleModalVisible: this.toggleModalVisible,
    });
  }

  toggleModalVisible = () => this.setState(prev => ({ modalVisible: !prev.modalVisible }));

  render() {
    const { modalVisible } = this.state;
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <TitleModalEditor
          navigation={navigation}
          toggleModalVisible={this.toggleModalVisible}
          visible={modalVisible}
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
