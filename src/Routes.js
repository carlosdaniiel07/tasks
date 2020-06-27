import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Login from './pages/Login';
import TaskList from './pages/TaskList';
import Register from './pages/Register';

const AppStack = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <AppStack.Navigator headerMode="none">
        <AppStack.Screen name="Login" component={Login} />
        <AppStack.Screen name="Register" component={Register} />
        <AppStack.Screen name="TaskList" component={TaskList} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
}
