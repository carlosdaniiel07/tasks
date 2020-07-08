import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
  ImageBackground,
  StyleSheet,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import Input from './../components/Input';

import {api, setToken} from './../services/api';
import {showAlert} from './../utils/utils';
import backgroundImage from './../../assets/images/login.jpg';
import globalStyles from './../styles/globalStyles';

export default function Login() {
  const [login, setLogin] = useState(null);
  const [password, setPassword] = useState(null);

  const navigator = useNavigation();

  function tryLogin() {
    const auth = {
      loginOrEmail: login,
      password,
    };

    api
      .post('/auth', auth)
      .then(res => {
        clearForm();
        setToken(res.data.accessToken);
        navigator.navigate('TaskList');
      })
      .catch(err => {
        const message =
          err.response.data.message || 'Ocorreu um erro ao fazer o login';
        showAlert('Erro', message);
        clearForm();
      });
  }

  function navigateToRegister() {
    navigator.navigate('Register');
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

        <TouchableOpacity
          style={[
            styles.loginButton,
            !login || !password ? styles.disabledLoginButton : {},
          ]}
          activeOpacity={0.9}
          disabled={!login || !password}
          onPress={tryLogin}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>

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
  loginButton: {
    marginTop: 10,
    backgroundColor: '#080',
    width: '60%',
    height: 40,
    padding: 8,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledLoginButton: {
    backgroundColor: '#aaa',
  },
  loginText: {
    color: globalStyles.colors.secondary,
    fontFamily: globalStyles.fontFamily,
    fontSize: 16,
  },
  helpText: {
    marginTop: 16,
    color: globalStyles.colors.secondary,
    fontFamily: globalStyles.fontFamily,
    textDecorationLine: 'underline',
  },
});
