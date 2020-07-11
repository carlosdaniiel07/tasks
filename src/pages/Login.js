import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ImageBackground,
  StyleSheet,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import Input from './../components/Input';
import Button from './../components/Button';

import {api, setToken} from './../services/api';
import {showAlert} from './../utils/utils';
import backgroundImage from './../../assets/images/login.jpg';
import globalStyles from './../styles/globalStyles';

export default function Login() {
  const [login, setLogin] = useState(null);
  const [password, setPassword] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigator = useNavigation();

  function tryLogin() {
    const auth = {
      loginOrEmail: login,
      password,
    };

    setLoading(true);

    api
      .post('/auth', auth)
      .then(res => {
        clearForm();
        setToken(res.data.accessToken);
        setLoading(false);

        navigator.navigate('TaskList');

        clearNavigationStack();
      })
      .catch(err => {
        const message =
          err.response.data.message || 'Ocorreu um erro ao fazer o login';

        setLoading(false);
        showAlert('Erro', message);
        clearForm();
      });
  }

  function navigateToRegister() {
    navigator.navigate('Register');
  }

  function clearNavigationStack() {
    navigator.reset({
      index: 0,
      routes: [{name: 'TaskList'}],
    });
  }

  function clearForm() {
    setLogin(null);
    setPassword(null);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <Text style={styles.title}>Tasks</Text>
        <Text style={styles.subtitle}>Iniciar sessão</Text>

        <View style={styles.inputContainer}>
          <Input
            icon="user"
            placeholder="Login ou e-mail"
            value={login}
            onChangeText={value => setLogin(value)}
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

        <Button
          disabled={!login || !password}
          onPress={tryLogin}
          text="Login"
          isLoading={loading}
          style={{marginTop: 10}}
        />

        <Text style={styles.helpText} onPress={navigateToRegister}>
          Ainda não tenho uma conta
        </Text>
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
  disabledLoginButton: {
    backgroundColor: '#aaa',
  },
  helpText: {
    marginTop: 16,
    color: globalStyles.colors.secondary,
    fontFamily: globalStyles.fontFamily,
    textDecorationLine: 'underline',
  },
});
