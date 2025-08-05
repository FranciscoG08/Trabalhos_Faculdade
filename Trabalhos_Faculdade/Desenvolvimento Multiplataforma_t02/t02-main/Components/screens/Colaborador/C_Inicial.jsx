import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { db } from '../../services/FirebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

import fundo_adm from '../../fundos/Fundo_Create_Task.png';

const C_Inicial = () => {
  const navigation = useNavigation();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksCollection = collection(db, 'tasks');
        const tasksSnapshot = await getDocs(tasksCollection);
        const tasksList = tasksSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTasks(tasksList);
      } catch (error) {
        console.error('Error fetching tasks: ', error);
      }
    };

    fetchTasks();
  }, []);

  const handleVerFuncionariosPress = () => {
    navigation.navigate('VerColaboradores_TL');
  };

  const handleVerFeedback = () => {
    navigation.navigate('Admin_TL_Feedback');
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={fundo_adm} style={styles.imageBackground}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Olá Colaborador,</Text>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTextName}>Manuel Fernandes</Text>
          </View>
        </View>
        <Text style={styles.tarefas}>Tickets</Text>
        <ScrollView style={styles.ticketContainer}>
          {tasks.map(task => (
            <TouchableOpacity
              key={task.id}
              onPress={() => navigation.navigate('C_Tarefas', { taskId: task.id , taskTitle: task.title, taskDeadline: task.deadline})}
              style={styles.ticketButton}
            >
              <View style={styles.conteudo_tarefa}>
                <Text><Icon name="clipboard" size={20} color="#00509D" /> {task.title}</Text>
                <Text>Deadline: {task.deadline}</Text>
                <Text>Description: {task.description}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ImageBackground>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.buttonEasel} onPress={handleVerFeedback}>
          <Ionicons name="easel-outline" size={30} color={'#ffd500'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonPeople} onPress={handleVerFuncionariosPress}>
          <Ionicons name="people-outline" size={30} color={'#ffd500'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ticketButton: {
    borderRadius: 15,
    overflow: 'hidden',
  },
  ticketContainer: {
    top: 20,
    maxHeight: 440,
    marginBottom: 160,
  },
  conteudo_tarefa: {
    width: 350,
    height: 110,
    borderRadius: 15,
    backgroundColor: '#FFD500',
    marginBottom: 10,
    padding: 10,
  },
  container: {
    flex: 1,
  },
  headerContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingTop: 60,
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
  tarefas: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FFD500',
    borderBottomWidth: 2,
    borderBottomColor: '#FFD500',
    textAlign: 'center',
    marginTop: 20,
  },
  imageBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    backgroundColor: '#001C49',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 10,
    width: '100%',
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
    marginRight: 10,
  },
});

export default C_Inicial;
