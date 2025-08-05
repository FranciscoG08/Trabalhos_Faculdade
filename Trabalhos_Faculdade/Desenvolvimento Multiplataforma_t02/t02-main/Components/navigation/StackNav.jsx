import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen.jsx';
import LoginScreen from '../screens/LoginScreen.jsx';
import SignUpScreen from '../screens/SignUpScreen.jsx';
import AdminInicialScreen from '../screens/Admin/AdminInicialScreen.jsx';
import AdminCreateTaskScreen from '../screens/Admin/AdminCreateTaskScreen.jsx';
import AdminVerColaboradores from '../screens/Admin/AdminVerColaboradores.jsx';
import TL_Inicial from '../screens/TL/TL_Inicial.jsx';
import TL_Colaboradores from '../screens/TL/TL_Colaboradores.jsx';
import TL_Tarefas from '../screens/TL/TL_Tarefas.jsx';
import C_Inicial from '../screens/Colaborador/C_Inicial.jsx';
import C_Tarefas from '../screens/Colaborador/C_Tarefas.jsx';
import EditTaskScreen from '../screens/Admin/EditTaskScreen.jsx';
import AdminVerTarefa from '../screens/Admin/AdminVerTarefa.jsx';
import AdminTarefaEditar from '../screens/Admin/AdminTarefaEditar.jsx';
import TL_CriarTicket_Tarefa from '../screens/TL/TL_CriarTicket_Tarefa.jsx';
import TL_EditarTicket_Tarefa from '../screens/TL/TL_EditarTicket_Tarefa.jsx';
import Admin_TL_Feedback from '../screens/Feedback/Admin_TL_Feedback.jsx';


const Stack = createStackNavigator();

const StackNav = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
      <Stack.Screen name="AdminInicial" component={AdminInicialScreen} options={{ headerShown: false }} />
      <Stack.Screen name="TL_Inicial" component={TL_Inicial} options={{ headerShown: false }} />
      <Stack.Screen name="CreateTask" component={AdminCreateTaskScreen} options={{ headerShown: false }} />
      <Stack.Screen name="VerColaboradores" component={AdminVerColaboradores} options={{ headerShown: false }} />
      <Stack.Screen name="VerColaboradores_TL" component={TL_Colaboradores} options={{ headerShown: false }} />
      <Stack.Screen name="VerTarefas_TL" component={TL_Tarefas} options={{ headerShown: false }} />
      <Stack.Screen name="C_Inicial" component={C_Inicial} options={{ headerShown: false }} />
      <Stack.Screen name="C_Tarefas" component={C_Tarefas} options={{ headerShown: false }} />
      <Stack.Screen name="EditTask" component={EditTaskScreen} options={{ headerShown: false }} />
      <Stack.Screen name="AdminVerTarefa" component={AdminVerTarefa} options={{ headerShown: false }} />
      <Stack.Screen name="AdminTarefaEditar" component={AdminTarefaEditar} options={{ headerShown: false }} />
      <Stack.Screen name="TL_CriarTicket_Tarefa" component={TL_CriarTicket_Tarefa} options={{ headerShown: false }} />
      <Stack.Screen name="TL_EditarTicket_Tarefa" component={TL_EditarTicket_Tarefa} options={{ headerShown: false }} />
      <Stack.Screen name="Admin_TL_Feedback" component={Admin_TL_Feedback} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default StackNav;
