import React from 'react';
import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation';
import CustomBottomTabBar from '../components/CustomNavigator/CustomBottomTabBar';
import Home from '../screens/Home';
import Trash from '../screens/Trash';

// Create the app main navigator
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
    tabBarComponent: props => <CustomBottomTabBar {...props} />,
  },
);

export default createAppContainer(NavigationTabs);
