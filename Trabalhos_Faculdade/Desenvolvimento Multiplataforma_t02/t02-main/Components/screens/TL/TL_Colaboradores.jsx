import React from 'react';
import { View, Text, FlatList, StyleSheet, ImageBackground, Image,TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import fundo_task from '../../fundos/Fundo_Create_Task.png';

import PlaceholderImage from '../../fundos/am.png'; 

const VerColaboradores = () => {
  const navigation = useNavigation();

  const handleCloseButton = () => {
    navigation.navigate('TL_Inicial');
  };

  const handleVerColaboradoresPress = () => {
    navigation.navigate('VerColaboradores_TL');
  };
  const handleVerFeedback = () => {
    navigation.navigate('Admin_TL_Feedback');
  };

  const empregados = [
    { id: 1, nome: 'João', profissao: 'Desenvolvedor', foto: PlaceholderImage  },
    { id: 2, nome: 'Maria', profissao: 'Designer', foto: PlaceholderImage  },
    { id: 3, nome: 'Pedro', profissao: 'Analista',foto: PlaceholderImage  },
    { id: 4, nome: 'Ana', profissao: 'Engenheira', foto: PlaceholderImage  },
  ];

  return (
    <View style={styles.container}>
      <ImageBackground source={fundo_task} style={styles.imageBackground}>
      <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Olá Team Leader,</Text>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTextName}>Manuel Fernandes</Text>
          </View>
        </View>
        <Text style={styles.title}>Lista de Colaboradores</Text>
        <View style={styles.content}>
          <FlatList
            data={empregados}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.itemContainer}>
                <View style={styles.itemContent}>
                  <Image source={item.foto} style={styles.foto} />
                  <View style={styles.textContainer}>
                    <Text style={styles.nome}>{item.nome}</Text>
                    <Text style={styles.profissao}>{item.profissao}</Text>
                  </View>
                </View>
              </View>
            )}
          />
        </View>
        
        <View style={styles.buttonDistance}></View>
        <TouchableOpacity style={styles.buttonContainer}  onPress={handleCloseButton}>
          <Ionicons name="arrow-back" size={40} color={'#00509D'} />
        </TouchableOpacity>

      </ImageBackground>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.buttonEasel} onPress={handleVerFeedback}>
          <Ionicons name="easel-outline" size={30} color={'#ffd500'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonPeople} onPress={handleVerColaboradoresPress}>
          <Ionicons name="people-outline" size={30} color={'#ffd500'}/>
        </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    width: '100%',
    bottom:130,
  },
  imageBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#FDC500',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 40,
    marginTop: 20,
    bottom:120,
    left: 0,
    textDecorationLine:'underline',
  },
  itemContainer: {
    backgroundColor: '#FDC500',
    borderRadius: 100,
    marginVertical: 5,
    padding: 10,
    width: '90%',
    left: 20,
    bottom: 0,
  },
  itemContent: {
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
  },
  profissao: {
    fontSize: 16,
    color: 'gray',
  },
  buttonDistance:{
    paddingTop:50,
  },  
  buttonContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FDC500',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft:250,
    bottom:20,
  },
  headerContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingTop:160,
  },
  headerText: {
    fontSize: 15,
    color: '#FFD500',
    fontWeight: 'bold',
    bottom:110,
  },
  headerTextName: {
    fontSize: 18,
    color: '#FFD500',
    fontWeight: '900',
  },
  headerTextContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingRight: 210,
    bottom:110,
  },  
  footer: {
    backgroundColor: '#001C49',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 10,
  },
  buttonPeople:{
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
  },
  buttonEasel:{
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    paddingEnd:10,
  }
  
});

export default VerColaboradores;








//Soluçao futura com base de dados i Guess(GPT)
{/*import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ImageBackground, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import fundo_task from '../fundos/Fundo_Create_Task.png';
import { getEmployeesFromDatabase } from '../services/databaseService'; // Suponha que esta função obtenha os dados dos empregados da base de dados

const VerEmpregados = () => {
  const [empregados, setEmpregados] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    // Função para obter os empregados da base de dados
    const fetchEmpregados = async () => {
      try {
        const data = await getEmployeesFromDatabase();
        setEmpregados(data); // Define os empregados obtidos do banco de dados
      } catch (error) {
        console.error('Erro ao obter os empregados:', error);
      }
    };

    fetchEmpregados();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemContent}>
        <Image source={{ uri: item.foto }} style={styles.itemImage} />
        <View style={styles.textContainer}>
          <Text style={styles.nome}>{item.nome}</Text>
          <Text style={styles.profissao}>{item.profissao}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ImageBackground source={fundo_task} style={styles.imageBackground}>
        <Text style={styles.title}>Lista de Empregados</Text>
        <FlatList
          data={empregados}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      </ImageBackground>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemContainer: {
    backgroundColor: '#FDC500',
    borderRadius: 10,
    marginVertical: 5,
    padding: 10,
    width: '90%',
    alignSelf: 'center',
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemImage: {
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
  },
  profissao: {
    fontSize: 16,
    color: 'gray',
  },
});

export default VerEmpregados;
 */}
