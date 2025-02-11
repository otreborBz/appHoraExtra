import React, { useState, useEffect } from 'react';
import { ScrollView, KeyboardAvoidingView, Platform, View, Text, TouchableOpacity, FlatList, Alert } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './src/style.js';
import generatePDF from './src/pdf';

import { Header } from './src/components/Header';
import { LoadingOverlay } from './src/components/LoadingOverlay';
import { LineSelector } from './src/components/LineSelector';
import { DateTimeInputs } from './src/components/DateTimeInputs';
import { ActionButtons } from './src/components/ActionButtons';
import { Footer } from './src/components/Footer';
import { EmployeeList } from './src/components/EmployeeList';
import { AddEmployeeModal } from './src/components/AddEmployeeModal';
import colaborador from './src/colaboradores/colaboradores.json';

import { useFormData } from './src/hooks/useFormData';
import { useLoading } from './src/hooks/useLoading';
import { HeaderInfo } from './src/components/HeaderInfo';
import { BasicInfoModal } from './src/components/BasicInfoModal';

export default function App() {
  const { isLoading, startLoading, stopLoading } = useLoading();
  const formHook = useFormData();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showBasicInfoModal, setShowBasicInfoModal] = useState(false);
  const [listKey, setListKey] = useState(0);

  const formHookWithModal = {
    ...formHook,
    setShowBasicInfoModal,
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

  useEffect(() => {
    console.log('Current employees in App:', formHook.employees);
    setListKey(prev => prev + 1);
  }, [formHook.employees]);

  const renderContent = () => (
    <>
      <HeaderInfo formHook={formHookWithModal} />
      
      <View style={styles.mainContent}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleContainer}>
            <Text style={styles.sectionTitle}>Postos de Trabalho</Text>
            <Text style={styles.sectionSubtitle}>
              {formHook.employees.length} postos adicionados
            </Text>
          </View>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => setShowAddModal(true)}
          >
            <Icon name="add" size={24} color="#fff" />
            <Text style={styles.addButtonText}>Adicionar</Text>
          </TouchableOpacity>
        </View>

        <EmployeeList 
          key={listKey}
          employees={formHook.employees}
          onRemoveEmployee={formHook.removeEmployee}
        />

        <View style={styles.actionsContainer}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.clearButton]}
            onPress={() => formHook.resetForm()}
          >
            <Icon name="delete-outline" size={24} color="#fff" />
            <Text style={styles.actionButtonText}>Limpar Tudo</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.actionButton, styles.exportButton]}
            onPress={handleGeneratePDF}
          >
            <Icon name="picture-as-pdf" size={24} color="#fff" />
            <Text style={styles.actionButtonText}>Gerar PDF</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Footer />
    </>
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <Header />
          {isLoading && <LoadingOverlay />}

          <FlatList
            data={[{ key: 'content' }]}
            renderItem={() => renderContent()}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            removeClippedSubviews={false}
            keyExtractor={() => 'main'}
          />

          <AddEmployeeModal
            visible={showAddModal}
            onClose={() => setShowAddModal(false)}
            onAddEmployee={formHook.addEmployee}
            employees={formHook.employees}
            colaboradores={colaborador}
          />

          <BasicInfoModal
            visible={showBasicInfoModal}
            onClose={() => setShowBasicInfoModal(false)}
            formHook={formHook}
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

