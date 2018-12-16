import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  View, ScrollView, Text, StyleSheet,
} from 'react-native';
import { $white, $darkBlue } from '../../utils/colors';
import commonNavigationOptions from '../commonNavigationOptions';
import RightMenu from '../../components/NewSet/RightMenu';
import TitleModalEditor from '../../components/NewSet/TitleModalEditor';

class NewSetScreen extends PureComponent {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  static navigationOptions = ({ navigation }) => ({
    ...commonNavigationOptions,
    title: navigation.getParam('title', 'New Set'),
    headerRight: <RightMenu navigation={navigation} />,
    headerStyle: {
      ...commonNavigationOptions.headerStyle,
      backgroundColor: navigation.getParam('bgColor', $darkBlue),
    },
  })

  state = {
    modalVisible: false,
  }

  componentDidMount() {
    const { navigation } = this.props;
    navigation.setParams({
      title: 'New Set',
      toggleModalVisible: this.toggleModalVisible,
    });
  }

  toggleModalVisible = () => this.setState(prev => ({ modalVisible: !prev.modalVisible }))

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

export default NewSetScreen;
