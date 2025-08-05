import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { db } from '../../services/FirebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

import fundo_adm from '../../fundos/Fundo_Create_Task.png';

const TL_Inicial = () => {
  const navigation = useNavigation();
  const [taskData, setTaskData] = useState([]);

  const convertStringToDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksCollection = collection(db, 'tasks');
        const tasksSnapshot = await getDocs(tasksCollection);
        const tasks = tasksSnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title,
            deadline: convertStringToDate(data.deadline),
            description: data.description,
          };
        });
        setTaskData(tasks);
      } catch (error) {
        console.error("Error fetching tasks: ", error);
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

  const handleTaskPress = (taskId, taskTitle) => {
    navigation.navigate('VerTarefas_TL', { taskId, taskTitle });
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={fundo_adm} style={styles.imageBackground}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Olá Team Leader,</Text>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTextName}>Manuel Fernandes</Text>
          </View>
        </View>
        <Text style={styles.tarefas}>Tickets a Vigiar</Text>
        <ScrollView style={styles.taskContainer}>
          {taskData.map(task => (
            <TouchableOpacity key={task.id} onPress={() => handleTaskPress(task.id, task.title)} style={styles.taskButton} >
              <View style={styles.conteudo_tarefa}>
                <Text><Icon name="clipboard" size={20} color="#00509D" /> {task.title}</Text>
                <Text>Deadline: {task.deadline}</Text>
                <Text>Description: {task.description}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.buttonContainer}>
            <Text style={styles.buttonText}><Icon name="pie-chart" size={40} color="#00296B" type='regular' /></Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('CreateTask')}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
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
  taskButton: {
    borderRadius: 15,
    overflow: 'hidden',
  },
  taskContainer: {
    top: 15,
    maxHeight: 500,
    marginBottom: 50,
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
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
    marginLeft: 115,
    marginBottom: 30,
  },
  buttonContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FDC500',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#003F88',
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

export default TL_Inicial;
