import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from '../style';

export const Header = () => (
  <View style={styles.header}>
    <Image 
      source={require('../assets/logo.png')} 
      style={styles.image}
      resizeMode="contain"
    />
    <View style={styles.headerContent}>
      <Text style={styles.title}>Controle de Hora Extra</Text>
      <Text style={styles.subtitle}>
        {new Date().toLocaleDateString('pt-BR', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}
      </Text>
    </View>
  </View>
); 