import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import StackNav from './StackNav';
import Admin_TL_Feedback from '../screens/Feedback/Admin_TL_Feedback.jsx';
import VerColaboradores from '../screens/Admin/AdminVerColaboradores.jsx';
import SignUpScreen from '../screens/SignUpScreen.jsx';
import C_Inicial from '../screens/Colaborador/C_Inicial.jsx';
import TL_Inicial from '../screens/TL/TL_Inicial.jsx';
import LoginScreen from '../screens/LoginScreen.jsx';

const Drawer = createDrawerNavigator();

const DrawerNav = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#00509D',
        },
        drawerLabelStyle: {
          color: '#FFD500',
          fontSize: 18,
        },
        drawerActiveTintColor: '#FFD500',
        drawerInactiveTintColor: '#FFD500',
        drawerActiveBackgroundColor: '#0077B6', // Leve animação com azul mais claro
        drawerItemStyle: {
          marginVertical: 5,
        },
      }}
    >
      <Drawer.Screen name="Home" component={StackNav} options={{ headerShown: false }} />
      <Drawer.Screen name="Feedback" component={Admin_TL_Feedback} options={{ headerShown: false }} />
      <Drawer.Screen name="Colaboradores" component={VerColaboradores} options={{ headerShown: false }} />
      <Drawer.Screen name="Sign-Up" component={SignUpScreen} options={{ headerShown: false }} />
      <Drawer.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Drawer.Screen name="TL_Inicial" component={TL_Inicial} options={{ headerShown: false }} />
      <Drawer.Screen name="C_Inicial" component={C_Inicial} options={{ headerShown: false }} />
    </Drawer.Navigator>
  );
};

export default DrawerNav;
