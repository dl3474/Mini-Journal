import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

import Notes from './Home';
import Input from './Input';
import Stats from './Stats';
import Calendar from './CalendarView'
import Auth from './Auth';



const AppNavigator = createMaterialTopTabNavigator(
  {
    Auth: {screen: Auth},
    Calendar: {screen: Calendar},
    Notes: { screen: Notes }, //how to not have this on the topTab while still able to navigate to it via button
    Input: {screen: Input},

    Stats: {screen: Stats},

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


const NavigationContainer = createAppContainer(AppNavigator);

export default NavigationContainer;
