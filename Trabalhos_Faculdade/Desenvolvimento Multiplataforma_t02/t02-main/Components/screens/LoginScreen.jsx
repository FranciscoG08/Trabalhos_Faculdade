import React, { useState, useContext } from 'react';
import { View, StyleSheet, ImageBackground, TextInput, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { collection, doc, getDoc } from 'firebase/firestore';
import UserContext from '../context/UserContext';
import fundo_login from '../fundos/Fundo_SignUp.png';
import { db } from '../services/FirebaseConfig';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [user, setUser] = useContext(UserContext);
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const auth = getAuth();
      const res = await signInWithEmailAndPassword(auth, email, password);
      const userEmail = res.user.email;

      const userRef = doc(db, 'users', userEmail);
      
      const userDoc = await getDoc(userRef);
      
      if (userDoc.exists()) {

        setUser(userDoc.data());
        
        navigation.navigate('AdminInicial');
      } else {

        setErrorMessage("Dados do usuário não encontrados");
      }
    } catch (error) {

      console.error('Erro durante o login:', error);
      setErrorMessage(error.message);
      
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={fundo_login} style={styles.imageBackground}>
        <View style={styles.content}>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={(val) => {
              setEmail(val);
              setErrorMessage("");
            }}
            placeholder="Email"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={(val) => {
              setPassword(val);
              setErrorMessage("");
            }}
            placeholder="Password"
            secureTextEntry
          />
        </View>
        <Text style={styles.errorMessage}>{errorMessage}</Text>
        <Text style={styles.forgotPasswordText}>Esqueceu-se da password?</Text>
        <TouchableOpacity onPress={handleLogin} style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.signUpText}>
          Não possui uma conta?{' '}
          <Text style={styles.signUpLink} onPress={() => navigation.navigate('SignUp')}>
            Registe-se
          </Text>
        </Text>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    marginTop: 200,
    marginBottom: 240,
  },
  input: {
    height: 50,
    marginBottom: 10,
    paddingHorizontal: 200,
    backgroundColor: '#FDC500',
    color: 'gray',
    fontSize: 20,
    borderRadius: 15,
    paddingLeft: 15,
  },
  buttonContainer: {
    height: 70,
    backgroundColor: '#FFD500',
    paddingVertical: 10,
    paddingHorizontal: 130,
    borderRadius: 15,
    bottom: 130,
  },
  buttonText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#003F88',
    textAlign: 'center',
  },
  errorMessage: {
    fontSize: 15,
    color: 'red',
    marginBottom: 10,
  },
  forgotPasswordText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FDC500',
    marginBottom: 25,
  },
  signUpText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FDC500',
  },
  signUpLink: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    fontSize: 20,
    color: 'yellow',
  },
});

export default LoginScreen;