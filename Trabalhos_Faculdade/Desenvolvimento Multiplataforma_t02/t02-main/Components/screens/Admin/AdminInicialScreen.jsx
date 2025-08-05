import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import fundo_adm from '../../fundos/Fundo_Adm.png';
import { db } from '../../services/FirebaseConfig';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';

const AdminInicialScreen = () => {
  const navigation = useNavigation();
  const [tasks, setTasks] = useState([]);

  const handleVerColaboradoresPress = () => {
    navigation.navigate('VerColaboradores');
  };
  const handleVerFeedback = () => {
    navigation.navigate('Admin_TL_Feedback');
  };
  const handleSignUpPress = () => {
    navigation.navigate('SignUp');
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksCollection = collection(db, 'tasks');
        const tasksSnapshot = await getDocs(tasksCollection);
        const tasksList = tasksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTasks(tasksList);
      } catch (error) {
        console.error("Erro ao buscar tarefas: ", error);
      }
    };
    fetchTasks();
  }, []);

  const handleEditTask = (task) => {
    navigation.navigate('EditTask', { task });
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteDoc(doc(db, 'tasks', taskId));
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error("Erro ao deletar tarefa: ", error);
    }
  };

  const handleViewTask = (task) => {
    navigation.navigate('AdminVerTarefa', { task });
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={fundo_adm} style={styles.imageBackground}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Olá Admin,</Text>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTextName}>Manuel Fernandes</Text>
          </View>
        </View>
        <Text style={styles.tarefas}>Tickets a Vigiar</Text>
        <ScrollView style={styles.ticketContainer}>
          {tasks.map(task => (
            <TouchableOpacity key={task.id} style={styles.conteudo_tarefa} onPress={() => handleViewTask(task)}>
              <Text style={styles.taskTitle}>{task.title}</Text>
              <Text style={styles.taskDescription}>{task.description}</Text>
              <Text style={styles.taskDeadline}>Data Limite: {task.deadline}</Text>
              <Text style={styles.taskEmployees}>Empregados: {task.employees.join(', ')}</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end', marginTop: 10 }}>
                <TouchableOpacity style={styles.editButton} onPress={() => handleEditTask(task)}>
                  <Ionicons name="pencil" size={20} color="green" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteTask(task.id)}>
                  <Ionicons name="trash" size={20} color="red" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.buttonContainer}>
            <Text style={styles.buttonText} onPress={() => navigation.navigate('CreateTask')}>+</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.buttonEasel} onPress={handleVerFeedback}>
          <Ionicons name="easel-outline" size={30} color={'yellow'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonPeople} onPress={handleVerColaboradoresPress}>
          <Ionicons name="people-outline" size={30} color={'yellow'}></Ionicons>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonPeople} onPress={handleSignUpPress}>
          <Ionicons name="person-add-outline" size={30} color={'yellow'}></Ionicons>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ticketContainer: {
    top: 15,
    maxHeight: 500,
    marginBottom: 95,
  },
  conteudo_tarefa: {
    width: 350,
    height: 150,
    borderRadius: 15,
    backgroundColor: '#FFD500',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 10,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
    padding: 10,
  },
  taskTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  taskDescription: {
    fontSize: 16,
  },
  taskDeadline: {
    fontSize: 14,
    color: 'red',
  },
  taskEmployees: {
    fontSize: 14,
    color: 'blue',
  },
  taskButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  editButton: {
    backgroundColor: 'transparent',
    padding: 8,
    borderRadius: 5,
    marginTop: -10,
  },
  deleteButton: {
    backgroundColor: 'transparent',
    padding: 8,
    borderRadius: 5,
    marginTop: -10,
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
  headerContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingTop: 50,
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
  tarefas: {
    fontSize: 40,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#FDC500',
    textDecorationLine: 'underline',
    marginTop: 10,
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

export default AdminInicialScreen;
