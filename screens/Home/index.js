import React from 'react';
import PropTypes from 'prop-types';

import {
  View, ScrollView, Text, StyleSheet,
} from 'react-native';

import Footer from './Footer';
import { $white } from '../../utils/colors';

const HomeScreen = ({ navigation }) => (
  <View style={styles.homeContainer}>
    <ScrollView style={styles.contentContainer}>
      <Text>HOME</Text>
    </ScrollView>
    <Footer navigation={navigation} />
  </View>
);

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: $white,
  },
});

HomeScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default HomeScreen;
