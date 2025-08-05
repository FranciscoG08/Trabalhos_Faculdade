import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { db } from '../../services/FirebaseConfig';
import { collection, query, getDocs } from 'firebase/firestore';
import fundo_adm from '../../fundos/Fundo_Create_Task.png';
import Icon from 'react-native-vector-icons/FontAwesome';

const TL_Tarefas = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { taskId, taskTitle } = route.params;

  const [tarefaData, setTarefaData] = useState([]);

  const handleVerFuncionariosPress = () => {
    navigation.navigate('VerColaboradores_TL');
  };

  const handleVerFeedback = () => {
    navigation.navigate('Admin_TL_Feedback');
  };

  const handleCriarTicket_Tarefa = () => {
    navigation.navigate('TL_CriarTicket_Tarefa', { taskId });
  };

  const handleEditarTarefa = (tarefaId) => {
    navigation.navigate('TL_EditarTicket_Tarefa', { taskId, tarefaId });
  };

  useEffect(() => {
    const fetchTarefas = async () => {
      try {
        const tarefasQuery = query(collection(db, 'tasks', taskId, 'tarefas'));
        const tarefasSnapshot = await getDocs(tarefasQuery);
        const tarefas = tarefasSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setTarefaData(tarefas);
      } catch (error) {
        console.error("Error fetching tasks: ", error);
      }
    };

    fetchTarefas();
  }, [taskId]);

  return (
    <View style={styles.container}>
      <ImageBackground source={fundo_adm} style={styles.imageBackground}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Olá Team Leader,</Text>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTextName}>Manuel Fernandes</Text>
          </View>
        </View>
        <Text style={styles.tarefas}>{taskTitle}</Text>
        <ScrollView style={styles.ticketContainer}>
          {tarefaData.map(tarefa => (
            <TouchableOpacity key={tarefa.id} style={styles.conteudo_tarefa} onPress={() => handleEditarTarefa(tarefa.id)}>
              <View style={[styles.descricaoContainer, tarefa.status === 1 ? { backgroundColor: 'rgba(255, 213, 0, 0.4)' } : styles.descricaoContainer,] }>
                <Text>
                  {tarefa.status === 1 ? (
                    <Icon name="check-square" size={20} color="blue" />
                  ) : (
                    <Icon name="square" size={20} color="blue" />
                  )}
                  {tarefa.descricao}
                </Text>
                <Text>
                  Status: {tarefa.status === 1 ? "Concluído" : "Pendente"}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.buttonContainer} onPress={handleCriarTicket_Tarefa}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer}>
            <Text style={styles.buttonText}>-</Text>
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
  descricaoContainer: {
    marginVertical: 5,
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#FFD500',
    borderRadius: 15,
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
});

export default TL_Tarefas;
