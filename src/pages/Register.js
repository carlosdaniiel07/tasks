import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
  ImageBackground,
  StyleSheet,
  Alert,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import Input from './../components/Input';

import {api} from './../services/api';
import backgroundImage from './../../assets/images/login.jpg';
import globalStyles from './../styles/globalStyles';

export default function Register() {
  const [name, setName] = useState(null);
  const [login, setLogin] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const navigator = useNavigation();

  function signUp() {
    const data = {
      name,
      login,
      email,
      password,
    };

    api
      .post('/sign-up', JSON.stringify(data))
      .then(() => {
        Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
        navigator.goBack();
      })
      .catch(() => {
        Alert.alert('Erro', 'Ocorreu um erro ao realizar o cadastro');
        clearForm();
      });
  }

  function clearForm() {
    setName(null);
    setLogin(null);
    setEmail(null);
    setPassword(null);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <Text style={styles.title}>Tasks</Text>
        <Text style={styles.subtitle}>Criar uma nova conta</Text>

        <View style={styles.inputContainer}>
          <Input
            icon="tag"
            placeholder="Nome"
            value={name}
            onChangeText={value => setName(value)}
          />
          <Input
            icon="user"
            placeholder="Login"
            value={login}
            onChangeText={value => setLogin(value)}
          />
          <Input
            icon="mail"
            placeholder="E-mail"
            value={email}
            onChangeText={value => setEmail(value)}
            autoCapitalize="none"
            autoCompleteType="email"
            keyboardType="email-address"
          />
          <Input
            icon="lock"
            placeholder="Senha"
            secureTextEntry={true}
            value={password}
            onChangeText={value => setPassword(value)}
            autoCapitalize="none"
          />
        </View>

        <TouchableOpacity
          style={styles.registerButton}
          activeOpacity={0.9}
          disabled={!name || !login || !email || !password}
          onPress={signUp}>
          <Text style={styles.registerText}>Registrar</Text>
        </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: globalStyles.fontFamily,
    color: globalStyles.colors.secondary,
    fontSize: 56,
  },
  subtitle: {
    fontFamily: globalStyles.fontFamily,
    color: globalStyles.colors.secondary,
    fontSize: 16,
  },
  inputContainer: {
    marginTop: 24,
    width: '90%',
  },
  input: {
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 6,
    height: 40,
    paddingHorizontal: 10,
    fontFamily: globalStyles.fontFamily,
  },
  registerButton: {
    marginTop: 10,
    backgroundColor: '#0366d6',
    width: '60%',
    height: 40,
    padding: 8,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerText: {
    color: globalStyles.colors.secondary,
    fontFamily: globalStyles.fontFamily,
    fontSize: 16,
  },
});
