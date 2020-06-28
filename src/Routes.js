import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/Feather';

import Login from './pages/Login';
import Register from './pages/Register';
import TaskList from './pages/TaskList';
import globalStyles from './styles/globalStyles';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function Routes() {
  return (
    <Stack.Navigator initialRouteName="Login" headerMode="none">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="TaskList" component={TaskListDrawer} />
    </Stack.Navigator>
  );
}

function TaskListDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="Today"
      drawerContentOptions={{
        activeTintColor: '#aaa',
        labelStyle: {
          fontFamily: globalStyles.fontFamily,
          color: '#000',
        },
      }}>
      <Drawer.Screen
        name="Today"
        component={TaskList}
        initialParams={{
          name: 'today',
        }}
        options={{
          drawerLabel: 'Hoje',
          drawerIcon: () => <Icon name="clock" size={20} />,
        }}
      />
      <Drawer.Screen
        name="Tomorrow"
        component={TaskList}
        initialParams={{
          name: 'tomorrow',
        }}
        options={{
          drawerLabel: 'Amanhã',
          drawerIcon: () => <Icon name="alert-circle" size={20} />,
        }}
      />
      <Drawer.Screen
        name="Week"
        component={TaskList}
        initialParams={{
          name: 'week',
        }}
        options={{
          drawerLabel: 'Semana',
          drawerIcon: () => <Icon name="calendar" size={20} />,
        }}
      />
      <Drawer.Screen
        name="Month"
        component={TaskList}
        initialParams={{
          name: 'month',
        }}
        options={{
          drawerLabel: 'Mês',
          drawerIcon: () => <Icon name="calendar" size={20} />,
        }}
      />
    </Drawer.Navigator>
  );
}
