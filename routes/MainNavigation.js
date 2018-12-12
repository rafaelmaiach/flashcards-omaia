import React from 'react';
import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation';
import BottomTabBar from './CustomNavigator/BottomTabBar';
import Home from '../screens/Home';
import NewSet from '../screens/NewSet';
import NewFolder from '../screens/NewFolder';
import Trash from '../screens/Trash';

const NavigationTabs = createMaterialTopTabNavigator(
  {
    Home: {
      screen: Home,
    },
    NewSet: {
      screen: NewSet,
    },
    NewFolder: {
      screen: NewFolder,
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
    tabBarComponent: props => <BottomTabBar {...props} />,
  },
);

export default createAppContainer(NavigationTabs);
