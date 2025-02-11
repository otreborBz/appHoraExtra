import React from 'react';
import { View, Text, TextInput } from 'react-native';
import styles from '../style';

export const EmployeeInputs = ({ formData, setFormData, handleInputFocus }) => (
  <View style={styles.inputsContainer}>
    {Object.keys(formData).map((label, index) => (
      <View key={index} style={styles.inputGroup}>
        <Text style={styles.inputLabel}>{label}</Text>
        <TextInput
          placeholder="Nome do colaborador"
          style={styles.input}
          value={formData[label]}
          onChangeText={(text) => setFormData({ ...formData, [label]: text })}
          onFocus={() => handleInputFocus(label, formData, setFormData)}
        />
      </View>
    ))}
  </View>
); 