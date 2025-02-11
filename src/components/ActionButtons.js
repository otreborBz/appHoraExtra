import React from 'react';
import { View, TouchableOpacity, Text, Alert } from 'react-native';
import styles from '../style';
import generatePDF from '../pdf';

export const ActionButtons = ({ formHook, startLoading, stopLoading }) => {
  const handleClear = () => {
    Alert.alert(
      "Confirmação",
      "Tem certeza que deseja limpar todos os campos?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Limpar",
          onPress: formHook.resetForm,
          style: "destructive"
        }
      ]
    );
  };

  const handleGeneratePDF = async () => {
    if (!formHook.line) {
      Alert.alert('Erro', 'Por favor, selecione uma linha');
      return;
    }

    if (formHook.employees.length === 0) {
      Alert.alert('Erro', 'Por favor, adicione pelo menos um colaborador');
      return;
    }

    if (formHook.exitTime <= formHook.entryTime) {
      Alert.alert('Erro', 'O horário de saída deve ser posterior ao horário de entrada');
      return;
    }

    try {
      startLoading();
      await generatePDF(
        formHook.line,
        formHook.date,
        formHook.entryTime,
        formHook.exitTime,
        formHook.getFormDataForPDF()
      );
      Alert.alert('Sucesso', 'PDF gerado com sucesso!');
    } catch (error) {
      Alert.alert('Erro', 'Erro ao gerar o PDF. Tente novamente.');
      console.error(error);
    } finally {
      stopLoading();
    }
  };

  return (
    <View style={styles.buttonsContainer}>
      <TouchableOpacity style={[styles.button, styles.clearButton]} onPress={handleClear}>
        <Text style={styles.buttonText}>Limpar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.exportButton]} onPress={handleGeneratePDF}>
        <Text style={styles.buttonText}>Gerar PDF</Text>
      </TouchableOpacity>
    </View>
  );
}; 