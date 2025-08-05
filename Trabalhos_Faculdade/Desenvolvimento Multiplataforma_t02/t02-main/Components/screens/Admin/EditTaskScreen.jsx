import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MultipleSelectList } from 'react-native-dropdown-select-list';
import fundo_task from '../../fundos/Fundo_Create_Task.png';
import { db } from '../../services/FirebaseConfig'; 
import { doc, updateDoc } from 'firebase/firestore';

const EditTaskScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { task } = route.params;

  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [selectedDate, setSelectedDate] = useState(task.deadline);
  const [selectedEmployees, setSelectedEmployees] = useState(task.employees);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
    setIsCalendarVisible(false);
  };

  const clearFields = () => {
    setTitle('');
    setDescription('');
    setSelectedDate('');
    setSelectedEmployees([]);
  };

  const handleCloseButton = () => {
    clearFields();
    navigation.navigate('AdminInicial');
  };

  const handleUpdateTask = async () => {
    if (!title || !description || !selectedDate || selectedEmployees.length === 0) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    try {
      await updateDoc(doc(db, 'tasks', task.id), {
        title: title,
        description: description,
        employees: selectedEmployees,
        deadline: selectedDate,
      });
      alert("Tarefa atualizada com sucesso!");
      navigation.navigate('AdminInicial');
    } catch (error) {
      console.error("Erro ao atualizar tarefa: ", error.message);
      alert("Erro ao atualizar tarefa. Tente novamente.");
    }
  };

  const data = [
    { key: '1', value: 'Francisco Guedes' },
    { key: '2', value: 'Manuel Teixeira' },
    { key: '3', value: 'Diogo Fernandes' },
    { key: '4', value: 'Marcelo Rocha' },
    { key: '5', value: 'Nelson Fernandes' },
    { key: '6', value: 'Paulo Cristovao' },
  ];

  return (
    <View style={styles.container}>
      <ImageBackground source={fundo_task} style={styles.imageBackground}>
        <Text style={styles.titulo}>Editar Tarefa</Text>

        <TextInput
          style={styles.tarefa}
          placeholder="Título"
          value={title}
          onChangeText={text => setTitle(text)}
        />

        <TextInput
          style={styles.descricao}
          placeholder="Descrição"
          multiline
          value={description}
          onChangeText={text => setDescription(text)}
        />

        <TouchableOpacity style={styles.dateInput} onPress={() => setIsCalendarVisible(!isCalendarVisible)}>
          <Text style={styles.dataLimite}>{selectedDate || 'Data Limite'}</Text>
        </TouchableOpacity>

        {isCalendarVisible && (
          <View style={{ width: 345 }}>
            <Calendar
              onDayPress={handleDayPress}
              markedDates={{ [selectedDate]: { selected: true } }}
            />
          </View>
        )}

        <View style={styles.lista}>
          <ScrollView horizontal>
            <MultipleSelectList
              setSelected={(val) => setSelectedEmployees(val)}
              data={data}
              save="value"
              placeholder="Selecionar Empregados"
              searchPlaceholder="Empregados"
              label="Empregados"
              labelStyles={{ textAlign: 'auto', color: 'yellow', fontSize: 25 }}
              badgeStyles={{ backgroundColor: 'red' }}
              badgeTextStyles={{ fontSize: 20, color: 'white' }}
              notFoundText='Funcionario nao encontrado'
              inputStyles={{ fontSize: 20, color: 'yellow' }}
              dropdownTextStyles={{ fontSize: 20, color: 'white' }}
              checkBoxStyles={{ backgroundColor: 'white', color: 'blue' }}
              defaultOption={selectedEmployees.map(emp => ({ key: emp, value: emp }))}
            />
          </ScrollView>
        </View>

        <View style={styles.botoesRow}>
          <TouchableOpacity style={styles.buttonContainerCheckmark} onPress={handleUpdateTask}>
            <Ionicons name="checkmark-outline" size={30} color={'green'} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer} onPress={handleCloseButton}>
            <Ionicons name="close" size={30} color={'red'} />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  // (Mantenha o estilo conforme definido anteriormente)
  container: {
    flex: 1,
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
  imageBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  tarefa: {
    fontSize: 35,
    width: '80%',
    height: 40,
    textAlign: 'center',
    backgroundColor: '#F5DEB3',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'black',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  descricao: {
    fontSize: 25,
    width: '80%',
    height: 200,
    backgroundColor: '#F5DEB3',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'black',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  dataLimite: {
    fontSize: 20,
    color: 'red',
  },
  lista: {
    width: '80%',
  },
  botoesRow: {
    flexDirection: 'row',
    paddingTop: 55,
  },
  buttonContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FDC500',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainerCheckmark: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FDC500',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  dateInput: {
    width: '80%',
    height: 40,
    backgroundColor: 'orange',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarContainer: {
    width: '80%',
    alignItems: 'center',
  }
});

export default EditTaskScreen;