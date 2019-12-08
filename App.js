import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './Reducer';
import AppNavigator from './AppNavigator';

const store = createStore(reducer);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={ store } >
        <AppNavigator />
      </Provider>
    );
  }
}