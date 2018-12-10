import React from 'react';
import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CustomBottomTabBar from './CustomBottomTabBar';
import Home from '../screens/Home';
import NewSet from '../screens/NewSet';
import Trash from '../screens/Trash';
import { $grey, $lightRed } from '../utils/colors';

const createTab = (screen, label, icon) => ({
  screen,
  navigationOptions: {
    tabBarLabel: label,
    tabBarIcon: ({ tintColor }) => ( // eslint-disable-line react/prop-types
      <MaterialCommunityIcons name={icon} color={tintColor} size={25} />
    ),
  },
});

const NavigationTabs = createMaterialTopTabNavigator(
  {
    Home: createTab(Home, 'Home', 'home'),
    NewSet: createTab(NewSet, 'New Set', 'plus-box'),
    Trash: createTab(Trash, 'Trash', 'trash-can'),
  },
  {
    initialRouteName: 'Home',
    tabBarPosition: 'bottom',
    swipeEnabled: true,
    animationEnabled: true,
    tabBarComponent: props => <CustomBottomTabBar {...props} />,
    tabBarOptions: {
      activeTintColor: $lightRed,
      inactiveTintColor: $grey,
      pressOpacity: 0.6,
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
