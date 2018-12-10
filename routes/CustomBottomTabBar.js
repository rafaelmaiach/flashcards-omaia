import React, { PureComponent } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { $lightRed } from '../utils/colors';

class CustomBottomTabBar extends PureComponent {
  state = {}

  render() {
    const {
      navigation: { state: { index, routes } },
      style,
      activeTintColor,
      inactiveTintColor,
      renderIcon,
      jumpTo,
    } = this.props;

    return (
      <View style={Object.assign({}, styles.container, style)}>
        {
            routes.map((route, idx) => (
              <View
                key={route.key}
                style={styles.tabContainer}
              >
                <TouchableOpacity onPress={() => jumpTo(route.key)}>
                  {renderIcon({
                    route,
                    focused: index === idx,
                    tintColor: index === idx ? activeTintColor : inactiveTintColor,
                  })}
                </TouchableOpacity>
              </View>
            ))
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 50,
    width: '100%',
  },
  tabContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CustomBottomTabBar;
