import React from 'react';
import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation';
import BottomTabBar from './CustomNavigator/BottomTabBar';
import Home from '../screens/Home';
import Trash from '../screens/Trash';
import { $black, $grey, $lightBlue } from '../utils/colors';

const NavigationTabs = createMaterialTopTabNavigator(
  {
    Home: {
      screen: Home,
    },
    Trash: {
      screen: Trash,
    },
  },
  {
    initialRouteName: 'Home',
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    animationEnabled: false,
    lazy: true,
    tabBarComponent: props => <BottomTabBar {...props} />,
    tabBarOptions: {
      activeTintColor: $lightBlue,
      inactiveTintColor: $black,
      style: {
        backgroundColor: 'transparent',
        borderTopWidth: 0.3,
        borderTopColor: $grey,
      },
      indicatorStyle: {
        height: 0,
      },
      showIcon: true,
    },
  },
);

export default createAppContainer(NavigationTabs);
