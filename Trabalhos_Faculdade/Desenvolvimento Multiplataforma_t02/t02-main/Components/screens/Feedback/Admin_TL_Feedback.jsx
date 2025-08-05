import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, ScrollView , Modal, Button, TextInput} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { db } from '../../services/FirebaseConfig';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import fundo_adm from '../../fundos/Fundo_Create_Task.png';

const Admin_TL_Feedback = () => {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [feedbackData, setFeedbackData] = useState([]);
  const [newFeedback, setNewFeedback] = useState({ titulo: '', descricao: '' });

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    try {
      const feedbackCollection = collection(db, 'feedback');
      const feedbackSnapshot = await getDocs(feedbackCollection);
      const feedbackList = feedbackSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFeedbackData(feedbackList);
    } catch (error) {
      console.error('Error fetching feedback: ', error);
    }
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleAddFeedback = async () => {
    try {
      const feedbackCollection = collection(db, 'feedback');
      await addDoc(feedbackCollection, newFeedback);
      setNewFeedback({ titulo: '', descricao: '' });
      toggleModal();
      // Atualiza a lista de feedbacks após adicionar um novo
      fetchFeedback();
    } catch (error) {
      console.error('Error adding feedback: ', error);
    }
  };

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
          <Text style={styles.headerText}>Olá Team Leader,</Text>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTextName}>Manuel Fernandes</Text>
          </View>
        </View>
        <Text style={styles.tarefas}>Team Feedback</Text>

        <ScrollView style={styles.feedbackContainer}>
          {feedbackData.map(ticket => (
            <View key={ticket.id} style={styles.ticketButton}>
              <View style={styles.conteudo_feedback}>
                <Text style={styles.titulo}> {ticket.titulo} </Text>
                {ticket.descricao && <Text style={styles.descricao}> {ticket.descricao}</Text>}
                <Text style={styles.feedbackUser}> Admin: Manuel Fernandes </Text>
              </View>
              
            </View>
          ))}

        </ScrollView>

        <Modal
          transparent={true}
          animationType="slide"
          visible={isModalVisible}
          onRequestClose={toggleModal}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Adicionar Feedback</Text>
              <TextInput
                style={styles.input}
                placeholder="Título"
                value={newFeedback.titulo}
                onChangeText={text => setNewFeedback({ ...newFeedback, titulo: text })}
              />
              <TextInput
                style={[styles.input, { height: 100 }]}
                placeholder="Descrição"
                value={newFeedback.descricao}
                onChangeText={text => setNewFeedback({ ...newFeedback, descricao: text })}
                multiline
              />
              <View style={styles.modalButtonContainer}>
                <Button title="Cancelar" onPress={toggleModal} color="#FFD500" />
                <Button title="Adicionar" onPress={handleAddFeedback} color="#FFD500" />
              </View>
            </View>
          </View>
        </Modal>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.buttonContainer} onPress={toggleModal}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.buttonEasel} onPress={handleVerFeedback}>
          <Ionicons name="easel-outline" size={30} color={'yellow'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonPeople} onPress={handleVerFuncionariosPress}>
          <Ionicons name="people-outline" size={30} color={'yellow'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  addButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#001C49',
    marginBottom: 10,
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
    marginTop: 20,
  },
  feedbackUser:{

    color:'#00509D',
    fontSize: 20,
    fontWeight: '600',
    bottom: 60,
    textAlign: 'left',
    justifyContent: 'flex-start',
    alignContent:'flex-start',

  },
  descricao: {
    color: '#00509D',
    width: '100%',
    height:'100%',
    fontWeight:'600',
    marginTop:5,
  },
  titulo: {
    fontSize: 20,
    color: '#00509D',
    fontWeight: 'bold',
    width:'100%',
  },
  conteudo_feedback: {
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
    flexDirection: 'column', 
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  feedbackContainer: {
    top: 15,
    maxHeight: 500, 
    marginBottom: 50, 
    width: 350,
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
    marginLeft: 275,
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

export default Admin_TL_Feedback;
