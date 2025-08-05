import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { db } from '../../services/FirebaseConfig';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import fundo_task from '../../fundos/Fundo_Create_Task.png';

const AdminTarefaEditar = ({ navigation, route }) => {
  const { tarefaId, taskId } = route.params; // taskId e tarefaId são passados corretamente

  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    const fetchTarefa = async () => {
      try {
        const tarefaDocRef = doc(db, 'tasks', taskId, 'tarefas', tarefaId); // taskId e tarefaId são usados corretamente
        const tarefaSnapshot = await getDoc(tarefaDocRef);
        const tarefaData = tarefaSnapshot.data();
        setDescription(tarefaData.descricao);
        setStatus(tarefaData.status.toString());
      } catch (error) {
        console.error("Erro ao buscar tarefa: ", error);
      }
    };
    fetchTarefa();
  }, [taskId, tarefaId]);

  const handleVerColaboradoresPress = () => {
    navigation.navigate('VerColaboradores');
  };

  const handleVerFeedback = () => {
    navigation.navigate('Admin_TL_Feedback');
  };

  const handleSignUpPress = () => {
    navigation.navigate('SignUp');
  };

  const handleUpdateTask = async () => {
    try {
      const tarefaDocRef = doc(db, 'tasks', taskId, 'tarefas', tarefaId);
      await updateDoc(tarefaDocRef, {
        descricao: description,
        status: parseInt(status),
      });
      Alert.alert("Sucesso", "Tarefa atualizada com sucesso!");
      navigation.navigate('AdminVerTarefa', { task: { id: taskId } });
    } catch (error) {
      console.error("Erro ao atualizar tarefa: ", error.message);
      Alert.alert("Erro", "Erro ao atualizar tarefa. Tente novamente.");
    }
  };

  const handleDeleteTask = async () => {
    try {
      await deleteDoc(doc(db, 'tasks', taskId, 'tarefas', tarefaId));
      Alert.alert("Sucesso", "Tarefa excluída com sucesso!");
      navigation.navigate('AdminVerTarefa', { task: { id: taskId } });
    } catch (error) {
      console.error("Erro ao excluir tarefa: ", error.message);
      Alert.alert("Erro", "Erro ao excluir tarefa. Tente novamente.");
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={fundo_task} style={styles.imageBackground}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Olá Admin,</Text>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTextName}>Manuel Fernandes</Text>
          </View>
        </View>
        <Text style={styles.titulo}>Editar Tarefa</Text>

        <TextInput
          style={styles.input}
          placeholder="Descrição"
          multiline
          value={description}
          onChangeText={text => setDescription(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Status"
          value={status}
          onChangeText={text => setStatus(text)}
        />

        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={handleUpdateTask}>
            <Ionicons name="checkmark-outline" size={30} color={'green'} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleDeleteTask}>
            <Ionicons name="trash-outline" size={30} color={'red'} />
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.buttonEasel} onPress={handleVerFeedback}>
          <Ionicons name="easel-outline" size={30} color={'yellow'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonPeople} onPress={handleVerColaboradoresPress}>
          <Ionicons name="people-outline" size={30} color={'yellow'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonPeople} onPress={handleSignUpPress}>
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
  input: {
    fontSize: 25,
    width: '80%',
    height: 40,
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

export default AdminTarefaEditar;
