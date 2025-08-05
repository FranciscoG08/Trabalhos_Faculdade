import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNav from './Components/navigation/DrawerNav';

const App = () => {
  return (
    <NavigationContainer>
      <DrawerNav />
    </NavigationContainer>
  );
};

export default App;
