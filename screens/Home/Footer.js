import React from 'react';
import PropTypes from 'prop-types';
import {
  View, TouchableOpacity, StyleSheet,
} from 'react-native';
import { Entypo, FontAwesome } from '@expo/vector-icons';
import {
  $lightBlue, $white, $lightRed, $black,
} from '../../utils/colors';

const HomeScreenFooter = ({ navigation }) => {
  const goHomeScreen = () => {
    const { state } = navigation;

    if (state.routeName !== 'Home') {
      navigation.navigate('Home');
    }
  };

  const goTrashScreen = () => {
    const { state } = navigation;

    if (state.routeName !== 'Trash') {
      navigation.navigate('Trash');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={goHomeScreen} activeOpacity={0.8}>
        <Entypo name="home" size={28} color={$lightRed} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} activeOpacity={0.8}>
        <Entypo name="squared-plus" size={28} color={$lightBlue} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={goTrashScreen} activeOpacity={0.8}>
        <FontAwesome name="trash" size={28} color={$lightBlue} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: $white,
    shadowColor: $black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 1,
    shadowOpacity: 0.5,
    elevation: 5,
  },
  button: {
    flex: 1,
    alignItems: 'center',
  },
});

HomeScreenFooter.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default HomeScreenFooter;
