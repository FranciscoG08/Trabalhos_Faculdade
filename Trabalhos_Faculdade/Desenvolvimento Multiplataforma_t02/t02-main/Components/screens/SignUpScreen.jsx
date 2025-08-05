import React, { useState, useContext } from 'react';
import { View, StyleSheet, ImageBackground, TextInput, TouchableOpacity, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import fundo_SignUp from '../fundos/Fundo_SignUp.png';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { db } from '../services/FirebaseConfig';
import { collection, doc, setDoc } from 'firebase/firestore';
import UserContext from '../context/UserContext';

const SignUpScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profissao, setProfissao] = useState('');
  const [image, setImage] = useState('');
  const [role, setRole] = useState(''); // Novo estado para role
  const [errorMessage, setErrorMessage] = useState('');
  const [user, setUser] = useContext(UserContext);
  const navigation = useNavigation();

  const handleSignUpPress = () => {
    const usersRef = collection(db, "users");
    if (password === confirmPassword) {
      createUserWithEmailAndPassword(getAuth(), email, password)
        .then((res) => {
          const user = {
            id: res.user.uid,
            firstName,
            lastName,
            profissao,
            email: res.user.email,
            image,
            role, // Adicionando o campo role ao objeto user
          };

          setDoc(doc(usersRef, user.email), user).then((res) => {
            setUser(user);
            navigation.navigate('Home'); // Navegar para a tela inicial após o registro
          });
        })
        .catch((error) => setErrorMessage(error.code));
    } else {
      setErrorMessage("Passwords do not match!");
    }
    clearFields();
  };

  const clearFields = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setProfissao('');
    setImage('');
    setRole(''); // Limpar o campo role
    setErrorMessage('');
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={fundo_SignUp} style={styles.imageBackground}>
        <View style={styles.content}>
          <View style={styles.namesRow}>
            <TextInput
              style={[styles.leftname, styles.input]}
              value={firstName}
              onChangeText={setFirstName}
              placeholder="Primeiro Nome"
              autoCapitalize="none"
            />
            <TextInput
              style={[styles.rightname, styles.input]}
              value={lastName}
              onChangeText={setLastName}
              placeholder="Último Nome"
              autoCapitalize="none"
            />
          </View>
          <TextInput
            style={styles.input}
            value={profissao}
            onChangeText={setProfissao}
            placeholder="Profissão"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirmar Password"
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            value={role}
            onChangeText={setRole}
            placeholder="Role"
            autoCapitalize="none"
          />
          <TouchableOpacity style={[styles.buttonFoto, image ? styles.buttonSelected : null]} onPress={pickImage}>
            <Text style={styles.buttonText2}>Escolher Foto</Text>
          </TouchableOpacity>
          {image && <Image source={{ uri: image }} style={[styles.image, { alignSelf: 'center' }]} />}
        </View>
        <TouchableOpacity style={styles.buttonContainer} onPress={handleSignUpPress}>
          <Text style={styles.buttonText}>Registrar</Text>
        </TouchableOpacity>
        {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    marginTop: 90,
    width: '90%',
    height: '10%',
    bottom: 200,
    opacity: 0.9,
  },
  namesRow: {
    flexDirection: 'row',
    bottom: 0,
  },
  leftname: {
    marginLeft: 10,
    marginEnd: 10,
    width: '45%',
  },
  rightname: {
    marginRight: 10,
    width: '45%',
  },
  input: {
    marginLeft: 10,
    marginRight: 10,
    height: 70,
    marginBottom: 10,
    backgroundColor: '#FDC500',
    color: 'gray',
    fontSize: 20,
    borderRadius: 15,
  },
  imageBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    height: 70,
    width: 330,
    backgroundColor: '#FDC500',
    borderRadius: 15,
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: -200,
    left: 0,
  },
  buttonFoto: {
    height: 50,
    width: '95%',
    backgroundColor: '#FDC500',
    borderRadius: 15,
    marginTop: 10,
    justifyContent: 'center',
    bottom: 10,
    left: 10,
  },
  buttonText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#003F88',
    textAlign: 'center',
  },
  buttonText2: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#003F88',
    textAlign: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FDC500',
    bottom: -160,
  },
  login: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    fontSize: 20,
    color: 'yellow',
  },
  image: {
    width: 100,
    height: 100,
  },
  errorMessage: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default SignUpScreen;
