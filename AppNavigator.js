import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

import Home from './Home';
import Input from './Input'


/*
const AppNavigator = createStackNavigator({
  Input: {screen: Input},
  Home: { screen: Home },

});*/


const AppNavigator = createMaterialTopTabNavigator(
  {
    Input: {screen: Input},
    Home: { screen: Home },
  },
  {
    tabBarOptions: {
      activeTintColor: 'white',
      inactiveTintColor: 'black',
      tabStyle: {
        backgroundColor: '#CE9DD9'
      }
    }
  }
);



// const navigationTabs = createMaterialTopTabNavigator(tabs, {initialRouteName: 'Todos'});

const NavigationContainer = createAppContainer(AppNavigator);

export default NavigationContainer;
