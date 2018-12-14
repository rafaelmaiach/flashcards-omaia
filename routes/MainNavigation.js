import React from 'react';
import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation';
import BottomTabBar from '../components/CustomNavigator/BottomTabBar';
import Home from '../screens/Home';
import Trash from '../screens/Trash';

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
    animationEnabled: true,
    tabBarComponent: props => <BottomTabBar {...props} />,
  },
);

export default createAppContainer(NavigationTabs);
