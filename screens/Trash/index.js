import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TrashScreen = () => (
  <View style={styles.trashContainer}>
    <Text>Trash Screen</Text>
  </View>
);

const styles = StyleSheet.create({
  trashContainer: {
    flex: 1,
  },
});

export default TrashScreen;
