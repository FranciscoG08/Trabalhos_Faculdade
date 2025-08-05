import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { db } from '../../services/FirebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import fundo_task from '../../fundos/Fundo_Create_Task.png';

const TL_CriarTicket_Tarefa = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { taskId } = route.params;

  const [descricao, setDescricao] = useState('');
  const [status, setStatus] = useState('0');

  const handleSaveTask = async () => {
    try {
      const tarefaCollectionRef = collection(db, 'tasks', taskId, 'tarefas');
      await addDoc(tarefaCollectionRef, {
        descricao,
        status: parseInt(status),
      });
      Alert.alert("Sucesso", "Tarefa adicionada com sucesso!");
      navigation.goBack();
    } catch (error) {
      console.error("Erro ao salvar tarefa: ", error.message);
      Alert.alert("Erro", "Erro ao salvar tarefa. Tente novamente.");
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={fundo_task} style={styles.imageBackground}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Olá Team Leader,</Text>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTextName}>Manuel Fernandes</Text>
          </View>
        </View>
        <Text style={styles.titulo}>Criar Tarefa</Text>

        <TextInput
          style={styles.inputdescricao}
          placeholder="Descrição"
          multiline
          value={descricao}
          onChangeText={setDescricao}
        />

        <TextInput
          style={styles.input}
          placeholder="Status (0 = Pendente, 1 = Concluído)"
          value={status}
          onChangeText={setStatus}
          keyboardType="numeric"
        />

        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={handleSaveTask}>
            <Ionicons name="checkmark-outline" size={30} color={'green'} />
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.buttonEasel} onPress={() => navigation.navigate('Admin_TL_Feedback')}>
          <Ionicons name="easel-outline" size={30} color={'yellow'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonPeople} onPress={() => navigation.navigate('VerColaboradores')}>
          <Ionicons name="people-outline" size={30} color={'yellow'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonPeople} onPress={() => navigation.navigate('SignUp')}>
          <Ionicons name="person-add-outline" size={30} color={'yellow'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingTop:50,
  },
  headerTextContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingRight: 210,
  },
  headerText: {
    fontSize: 15,
    color: '#FFD500',
    fontWeight: 'bold',
  },
  headerTextName: {
    fontSize: 18,
    color: '#FFD500',
    fontWeight: '900',
  },
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 40,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'yellow',
    textDecorationLine: 'underline',
    paddingTop: 30,
    paddingBottom: 50,
  },
  inputdescricao: {
    fontSize: 25,
    width: '80%',
    height: 190,
    backgroundColor: '#F5DEB3',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'black',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  input: {
    fontSize: 25,
    width: '80%',
    height: 80,
    backgroundColor: '#F5DEB3',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'black',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
  },
  button: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FDC500',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    backgroundColor: '#001C49',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 10,
  },
  buttonPeople: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
  },
  buttonEasel: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    paddingEnd: 10,
  },
});

export default TL_CriarTicket_Tarefa;
