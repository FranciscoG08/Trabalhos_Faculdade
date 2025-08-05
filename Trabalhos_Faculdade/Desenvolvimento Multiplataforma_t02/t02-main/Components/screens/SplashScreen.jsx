import React, { useEffect } from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';

import imagem_fundo from '../fundos/Fundo_Inicial.png'; 

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login'); 
    }, 1000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ImageBackground source={imagem_fundo} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1, 
    width: '100%', 
    height: '100%', 
  },
});

export default SplashScreen;