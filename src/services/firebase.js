import firebase from 'react-native-firebase';
import AsyncStorage from '@react-native-community/async-storage';

import {showAlert} from './../utils/';

const initFirebaseService = async () => {
  await checkPermission();
  createNotificationListeners();

  const token = await getDeviceToken();

  return token;
};

const checkPermission = async () => {
  const hasPermission = await firebase.messaging().hasPermission();

  if (!hasPermission) {
    try {
      await firebase.messaging().requestPermission();
    } catch (error) {}
  }
};

const getDeviceToken = async () => {
  const token = await firebase.messaging().getToken();
  const savedToken = AsyncStorage.getItem('firebaseDeviceToken');

  if (savedToken !== token) {
    await AsyncStorage.setItem('firebaseDeviceToken', token);
  }

  return token;
};

const createNotificationListeners = () => {
  firebase.notifications().onNotification(notification => {
    const {title, body} = notification;
    showAlert(title, body);
  });
};

module.exports = {
  initFirebaseService,
};
