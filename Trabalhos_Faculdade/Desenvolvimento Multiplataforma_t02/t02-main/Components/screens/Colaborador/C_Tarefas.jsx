import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, ScrollView, Modal, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import fundo_adm from '../../fundos/Fundo_Create_Task.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import { db } from '../../services/FirebaseConfig';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';

const C_Tarefas = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { taskId, taskTitle, taskDeadline } = route.params;
  const [tarefas, setTarefas] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    const fetchTarefas = async () => {
      try {
        const tarefasCollection = collection(db, 'tasks', taskId, 'tarefas');
        const tarefasSnapshot = await getDocs(tarefasCollection);
        const tarefasList = tarefasSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTarefas(tarefasList);
      } catch (error) {
        console.error('Error fetching tarefas: ', error);
      }
    };

    fetchTarefas();
  }, [taskId]);

  const handleVerFuncionariosPress = () => {
    navigation.navigate('VerColaboradores_TL');
  };

  const handleVerFeedback = () => {
    navigation.navigate('Admin_TL_Feedback');
  };

  const completedTasksCount = tarefas.filter(tarefa => tarefa.status === 1).length;
  const totalTasksCount = tarefas.length;
  const progressPercentage = totalTasksCount === 0 ? 0 : (completedTasksCount / totalTasksCount) * 100;

 
  const getDeadlineColor = (taskDeadline) => {
    const currentDate = new Date();
    const deadlineDate = new Date(taskDeadline);

    const timeDiff = deadlineDate - currentDate;
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    if (daysDiff <= 0) {
      return 'red'; 
    } else if (daysDiff <= 2) {
      return 'yellow'; 
    } else {
      return 'green'; 
    }
  };

  
  const handleStatusChange = async (tarefa, status) => {
    try {
      const tarefaDocRef = doc(db, 'tasks', taskId, 'tarefas', tarefa.id);
      await updateDoc(tarefaDocRef, { status });
      setTarefas(prevTarefas => prevTarefas.map(t => t.id === tarefa.id ? { ...t, status } : t));
      setModalVisible(false);
    } catch (error) {
      console.error('Error updating tarefa status: ', error);
    }
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
        <Text style={styles.tarefas}>{taskTitle}</Text>
        <ScrollView style={styles.ticketContainer}>
          {tarefas.map(tarefa => (
            <TouchableOpacity key={tarefa.id} onPress={() => { setSelectedTask(tarefa); setModalVisible(true); }}>
              <View style={[styles.conteudo_tarefa, tarefa.ad_description && styles.conteudo_tarefa_with_ad]}>
                <View style={[styles.descriptionContainer, tarefa.status === 1 ? { backgroundColor: 'rgba(255, 213, 0, 0.4)' } : styles.descriptionContainer,]}>
                  <View style={styles.taskInfo}>
                    <View style={[styles.colorDot, { backgroundColor: getDeadlineColor(tarefa.deadline) }]} />
                    <Text style={[styles.cor_texto, tarefa.status === 1 ? styles.textUnderline : styles.textNormal,]}>
                      <Icon name={tarefa.status === 1 ? "check-square" : "square"} size={20}  /> {tarefa.descricao}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View style={styles.progressoContainer}>
          <Text style={styles.progressoText}>{Math.round(progressPercentage)}%</Text>
          <View style={[styles.progresso, { width: `${progressPercentage - 20}%` }]} />
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

      {selectedTask && (
        <Modal
          transparent={true}
          animationType="slide"
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Alterar Status da Tarefa</Text>
              <Text style={styles.modalTaskDescription}>{selectedTask.descricao}</Text>
              <View style={styles.modalButtonContainer}>
                <Button title="Concluir" onPress={() => handleStatusChange(selectedTask, 1)} />
                <Button title="Não Concluída" onPress={() => handleStatusChange(selectedTask, 0)} />
              </View>
              <Button title="Cancelar" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
 
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: '#FFD500',
    borderRadius: 15,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#00509D',
  },
  modalTaskDescription: {
    fontSize: 16,
    marginBottom: 20,
    color: '#00509D',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
    
  },
  progressoContainer: {
    backgroundColor: "#FFD500",
    height: '12%',
    alignItems: 'center', // Center progress bar horizontally
    justifyContent: 'center', // Center progress bar vertically
    width: '80%',
    borderRadius: 15,
    marginBottom: 20,
    bottom:115,
  },
  progresso: {
    height: 25,
    width: 100,
    top: 20,
    borderRadius: 5,
    backgroundColor: '#00509D',
    shadowOffset: {
      width: 10,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressoText: {
    position: 'absolute',
    bottom: 50,
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 20,
    color: '#00509D',
  },
  conteudo_tarefa_with_ad: {
    marginBottom: 40,
  },
  ad_description: {
    color: '#FFD500',
    fontSize: 14,
    marginLeft: 50,
    marginTop: 5,
    opacity: 0.9,
  },
  descriptionContainer: {
    marginVertical: 5,
    width: '70%',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#FFD500',
    borderRadius: 15,
  },
  cor_texto: {
    color: '#00509D',
    fontWeight: 'bold',
  },
  textUnderline: {
    color: '#00509D',
    fontWeight: 'bold',
    textDecorationLine: 'line-through',
  },
  taskInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorDot: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    marginRight: 10,
  },
  ticketContainer: {
    top: 15,
    maxHeight: 500,
    marginBottom: 30,
  },
  conteudo_tarefa: {
    width: 350,
    height: 50,
    borderRadius: 15,
    marginBottom: 10,
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
    fontSize: 10,
    color: '#FFD500',
    fontWeight: 'bold',
  },
  headerTextName: {
    fontSize: 18,
    color: '#FFD500',
    fontWeight: '900',
  },
  tarefas: {
    fontSize: 30,
    fontWeight: '900',
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
    marginLeft: 130,
    marginBottom: 25,
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
    color: '#00296B',
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

export default C_Tarefas;
