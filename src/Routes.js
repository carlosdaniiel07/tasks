import React from 'react';
import {StyleSheet, View, Image} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/Feather';

import userImage from './../assets/images/user.png';
import Login from './pages/Login';
import Register from './pages/Register';
import TaskList from './pages/TaskList';
import globalStyles from './styles/globalStyles';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const itemStyles = StyleSheet.create({
  item: {
    fontFamily: globalStyles.fontFamily,
    color: '#000',
  },
});

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
      drawerContent={props => <CustomDrawerContent {...props} />}
      initialRouteName="Today"
      drawerContentOptions={{
        activeTintColor: '#aaa',
        labelStyle: itemStyles.item,
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

function CustomDrawerContent(props) {
  const navigation = useNavigation();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#eaeaea',
    },
    header: {
      padding: 10,
      alignItems: 'center',
    },
    headerImage: {
      width: 50,
      height: 50,
    },
  });

  return (
    <DrawerContentScrollView style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.headerImage} source={userImage} />
      </View>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Logout"
        labelStyle={itemStyles.item}
        icon={() => <Icon name="log-out" size={20} />}
        onPress={() => navigation.navigate('Login')}
      />
    </DrawerContentScrollView>
  );
}
