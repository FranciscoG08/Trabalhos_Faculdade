import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, ScrollView, Image, Modal, Button, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import fundo_task from '../../fundos/Fundo_Create_Task.png';
import { db } from '../../services/FirebaseConfig';
import { collection, query, where, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';
import PlaceholderImage from '../../fundos/am.png';

const VerColaboradores = () => {
  const navigation = useNavigation();
  const [empregados, setEmpregados] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [updatedEmployee, setUpdatedEmployee] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const usersCollection = collection(db, 'users');
      const userSnapshot = await getDocs(usersCollection);
      const usersList = userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setEmpregados(usersList);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  const handleEmployeePress = (employee) => {
    setSelectedEmployee(employee);
    setUpdatedEmployee(employee);
    setModalVisible(true);
  };

  const handleUpdateEmployee = async () => {
    if (!selectedEmployee || !selectedEmployee.email) {
      console.error('Selected employee email is invalid');
      return;
    }
  
    try {
      const usersRef = collection(db, 'users');
      const querySnapshot = await getDocs(query(usersRef, where('email', '==', selectedEmployee.email)));
  
      if (querySnapshot.empty) {
        console.error('No employee found with the provided email');
        return;
      }
  
      const employeeDoc = querySnapshot.docs[0].ref;
      await updateDoc(employeeDoc, updatedEmployee);
      setModalVisible(false);
      fetchData(); 
    } catch (error) {
      console.error('Error updating employee: ', error);
    }
  };
  
  const handleDeleteEmployee = async () => {
    if (!selectedEmployee || !selectedEmployee.email) {
      console.error('Selected employee email is invalid');
      return;
    }
  
    try {
      const usersRef = collection(db, 'users');
      const querySnapshot = await getDocs(query(usersRef, where('email', '==', selectedEmployee.email)));
  
      if (querySnapshot.empty) {
        console.error('No employee found with the provided email');
        return;
      }
  
      const employeeDoc = querySnapshot.docs[0].ref;
      await deleteDoc(employeeDoc);
      setModalVisible(false);
      fetchData(); // Atualiza a lista de colaboradores após a exclusão
    } catch (error) {
      console.error('Error deleting employee: ', error);
    }
  };
  
  

  const handleCloseButton = () => {
    navigation.navigate('AdminInicial');
  };

  const handleVerColaboradoresPress = () => {
    navigation.navigate('VerColaboradores');
  };

  const handleVerFeedback = () => {
    navigation.navigate('Admin_TL_Feedback');
  };

  const handleSignUpPress = () => {
    navigation.navigate('SignUp');
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
        <Text style={styles.tarefas}>Lista de Colaboradores</Text>
        <ScrollView style={styles.ticketContainer}>
          {empregados.map((item) => (
            <TouchableOpacity key={item.id} onPress={() => handleEmployeePress(item)}>
              <View style={styles.conteudo_colaborador}>
                <View style={styles.colaboradorContent}>
                  <Image source={item.image ? { uri: item.image } : PlaceholderImage} style={styles.foto} />
                  <View style={styles.textContainer}>
                    <Text style={styles.nome}>{item.firstName} {item.lastName}</Text>
                    <Text style={styles.profissao}>{item.profissao}</Text>
                    <Text style={styles.email}>{item.email}</Text>
                    <Text style={styles.role}>{item.role}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <TouchableOpacity style={styles.buttonContainer} onPress={handleCloseButton}>
          <Ionicons name="arrow-back" size={40} color={'#00509D'} />
        </TouchableOpacity>
      </ImageBackground>

      <Modal
        transparent={true}
        animationType="slide"
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Editar Colaborador</Text>
            <TextInput
              style={styles.input}
              placeholder="Nome"
              value={updatedEmployee.firstName}
              onChangeText={text => setUpdatedEmployee({ ...updatedEmployee, firstName: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Sobrenome"
              value={updatedEmployee.lastName}
              onChangeText={text => setUpdatedEmployee({ ...updatedEmployee, lastName: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Profissão"
              value={updatedEmployee.profissao}
              onChangeText={text => setUpdatedEmployee({ ...updatedEmployee, profissao: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={updatedEmployee.email}
              onChangeText={text => setUpdatedEmployee({ ...updatedEmployee, email: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Função"
              value={updatedEmployee.role}
              onChangeText={text => setUpdatedEmployee({ ...updatedEmployee, role: text })}
            />
            <View style={styles.modalButtonContainer}>
              <Button title="Cancelar" onPress={() => setModalVisible(false)} color="#FFD500" />
              <Button title="Salvar" onPress={handleUpdateEmployee} color="#FFD500" />
              <Button title="Excluir" onPress={handleDeleteEmployee} color="#FF0000" />
            </View>
          </View>
        </View>
      </Modal>

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
    top: 10,
    maxHeight: 500,
    marginBottom: 95,
    width: 350,

  },
  conteudo_colaborador: {
    width: 350,
    height: 170,
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
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  colaboradorContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  foto: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00509D',
  },
  profissao: {
    fontSize: 16,
    color: 'gray',
  },
  email: {
    fontSize: 14,
    color: 'gray',
  },
  role: {
    fontSize: 14,
    color: 'gray',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#00509D',
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
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
  headerContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingTop: 30,
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
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFD500',
    borderBottomWidth: 2,
    borderBottomColor: '#FFD500',
    textAlign: 'center',
    marginTop: 20,
  },
  buttonContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFD500',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 60,
    left:80

  },
  footer: {
    backgroundColor: '#001C49',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
    width: '100%',
    position: 'absolute',
    bottom: 0,
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
  },
});

export default VerColaboradores;
