import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import styles from '../style';

export const LoadingOverlay = () => (
  <View style={styles.loadingOverlay}>
    <ActivityIndicator size="large" color="#0066cc" />
    <Text style={styles.loadingText}>Processando...</Text>
  </View>
); 