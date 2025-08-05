import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { db } from '../../services/FirebaseConfig';
import { Ionicons } from '@expo/vector-icons';
import { collection, getDocs } from 'firebase/firestore';
import fundo_adm from '../../fundos/Fundo_Create_Task.png';
import Icon from 'react-native-vector-icons/FontAwesome';

const AdminVerTarefa = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { task } = route.params;

  const [tarefas, setTarefas] = useState([]);

  const handleVerColaboradoresPress = () => {
    navigation.navigate('VerColaboradores');
  };

  const handleVerFeedback = () => {
    navigation.navigate('Admin_TL_Feedback');
  };

  const handleSignUpPress = () => {
    navigation.navigate('SignUp');
  };

  const handleEditTarefa = (tarefaId) => {
    navigation.navigate('AdminTarefaEditar', { tarefaId, taskId: task.id });
  };

  useEffect(() => {
    const fetchTarefas = async () => {
      try {
        const tarefasCollection = collection(db, 'tasks', task.id, 'tarefas');
        const tarefasSnapshot = await getDocs(tarefasCollection);
        const tarefasList = tarefasSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTarefas(tarefasList);
      } catch (error) {
        console.error("Erro ao buscar tarefas: ", error);
      }
    };
    fetchTarefas();
  }, [task.id]);

  return (
    <View style={styles.container}>
      <ImageBackground source={fundo_adm} style={styles.imageBackground}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Olá Admin,</Text>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTextName}>Manuel Fernandes</Text>
          </View>
        </View>
        <Text style={styles.taskTitle}>{task.title}</Text>
        <ScrollView style={styles.ticketContainer}>
            {tarefas.map(tarefa => (
                <TouchableOpacity key={tarefa.id} style={styles.conteudo_tarefa} onPress={() => handleEditTarefa(tarefa.id)}>
                <View style={styles.descricaoContainer}>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  taskTitle: {
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

export default AdminVerTarefa;
