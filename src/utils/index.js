import {Alert} from 'react-native';

export const showAlert = (title = 'Erro', message) => {
  Alert.alert(title, message);
};
