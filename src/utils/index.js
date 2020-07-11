import {Alert} from 'react-native';

export const showAlert = (title = 'Erro', message) => {
  Alert.alert(title, message);
};

export const toApiFormat = localeDateString => {
  const dateSplit = localeDateString.split('/');

  if (dateSplit.length !== 3) {
    return null;
  }

  return `${dateSplit[2]}-${dateSplit[1]}-${dateSplit[0]}`;
};
