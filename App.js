import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View, ScrollView, Modal, FlatList, Image, KeyboardAvoidingView, Platform } from 'react-native';
import styles from './src/style.js';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import generatePDF from './src/pdf';

import colaborador from './src/colaboradores/colaboradores.json'

// Lista de colaboradores (com ID e nome)
const employees = colaborador;

export default function App() {
 
  const [line, setLine] = useState('');
  const [date, setDate] = useState(new Date());
  const [entryTime, setEntryTime] = useState(new Date());
  const [exitTime, setExitTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showEntryTimePicker, setShowEntryTimePicker] = useState(false);
  const [showExitTimePicker, setShowExitTimePicker] = useState(false);
  const [formData, setFormData] = useState({
    'Isoladora de ranhura 1': '',
    'Isoladora de ranhura 2': '',
    'Abastecimento': '',
    'Isolação H': '',
    'HTM 1': '',
    'HTM 2': '',
    'HTM 3': '',
    'Tubo': '',
    'Embutição 1': '',
    'Embutição 2': '',
    'Costura 1': '',
    'Costura 2': '',
    'Examinação': '',
    'Teste final': '',
    'Recuperação': '',
    'Preparador': '',
  });

  // Modal e pesquisa de colaboradores
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeInput, setActiveInput] = useState('');
  const [query, setQuery] = useState('');
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  const onQueryChange = (text) => {
    setQuery(text);
    if (text.length > 0) {
      const filtered = employees.filter((employee) =>
        employee.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredEmployees(filtered);
    } else {
      setFilteredEmployees([]);
    }
  };

  const onSelectEmployee = (name, id) => {
    setFormData({
      ...formData,
      [activeInput]: `${name} (RE: ${id})`, // Adiciona o nome e ID no campo
    });
    setQuery(''); // Limpa a pesquisa
    setFilteredEmployees([]); // Limpa sugestões
    setIsModalVisible(false); // Fecha o modal após selecionar
  };
  

  const handleInputFocus = (inputLabel) => {
    setActiveInput(inputLabel); // Define qual input está ativo
    setQuery(''); // Limpa a pesquisa ao focar em um novo input
    setFilteredEmployees([]); // Limpa as sugestões ao focar
    setIsModalVisible(true); // Abre o modal sempre que o campo é focado
    setFormData((prevData) => ({
      ...prevData,
      [inputLabel]: '', // Limpa o valor atual do campo
    }));
  };
  
  

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) setDate(selectedDate);
  };

  const onEntryTimeChange = (event, selectedTime) => {
    setShowEntryTimePicker(false);
    if (selectedTime) setEntryTime(selectedTime);
  };

  const onExitTimeChange = (event, selectedTime) => {
    setShowExitTimePicker(false);
    if (selectedTime) setExitTime(selectedTime);
  };

  const clear = () => {
    setLine('');
    setDate(new Date());
    setEntryTime(new Date());
    setExitTime(new Date());
    setFormData({
      'Isoladora de ranhura 1': '',
      'Isoladora de ranhura 2': '',
      'Abastecimento': '',
      'Isolação H': '',
      'HTM 1': '',
      'HTM 2': '',
      'HTM 3': '',
      'Tubo': '',
      'Embutição 1': '',
      'Embutição 2': '',
      'Costura 1': '',
      'Costura 2': '',
      'Examinação': '',
      'Teste final': '',
      'Recuperação': '',
      'Preparador': '',
    });
  };

  const handleGeneratePDF = async () => {
    console.log(colaborador);
    await generatePDF(line, date, entryTime, exitTime, formData);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <View style={styles.header}>
            <Image source={require('./src/assets/logo.png')} style={styles.image} />
            <View style={styles.text}>
              <Text style={styles.title}>Hora extra</Text>
              <Text style={styles.subtitle}>Organization</Text>
            </View>
          </View>

          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.pickerContainer}>
              <Text style={styles.label}>Linha:</Text>
              <Picker selectedValue={line} onValueChange={(itemValue) => setLine(itemValue)} style={styles.picker}>
                <Picker.Item label="Selecione uma linha" value="" />
                <Picker.Item label="G" value="G" />
                <Picker.Item label="H" value="H" />
                <Picker.Item label="J" value="J" />
                <Picker.Item label="K" value="K" />
                <Picker.Item label="N" value="N" />
              </Picker>
            </View>

            <Text style={styles.label}>Data:</Text>
            <TouchableOpacity style={styles.dateButton} onPress={() => setShowDatePicker(true)}>
              <Text style={styles.dateButtonText}>{date.toLocaleDateString('pt-BR')}</Text>
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker value={date} mode="date" display="default" onChange={onDateChange} />
            )}

            <View style={styles.dateTimeRow}>
              <View style={styles.dateTimeBloco}>
                <Text style={styles.label}>Entrada:</Text>
                <TouchableOpacity style={styles.dateButton} onPress={() => setShowEntryTimePicker(true)}>
                  <Text style={styles.dateButtonText}>
                    {entryTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                  </Text>
                </TouchableOpacity>
                {showEntryTimePicker && (
                  <DateTimePicker value={entryTime} mode="time" display="default" onChange={onEntryTimeChange} />
                )}
              </View>

              <View style={styles.dateTimeBloco}>
                <Text style={styles.label}>Saída:</Text>
                <TouchableOpacity style={styles.dateButton} onPress={() => setShowExitTimePicker(true)}>
                  <Text style={styles.dateButtonText}>
                    {exitTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                  </Text>
                </TouchableOpacity>
                {showExitTimePicker && (
                  <DateTimePicker value={exitTime} mode="time" display="default" onChange={onExitTimeChange} />
                )}
              </View>
             

            </View>

            <View style={styles.inputsContainer}>
              {Object.keys(formData).map((label, index) => (
                <View key={index} style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>{label}</Text>
                  <TextInput
                    placeholder="Nome do colaborador"
                    style={styles.input}
                    value={formData[label]} // Exibe o valor atual no input
                    onChangeText={(text) => setFormData({ ...formData, [label]: text })} // Permite edição direta
                    onFocus={() => handleInputFocus(label)} // Sempre abre o modal ao focar
                  />



                </View>
              ))}
            </View>

            {/* Modal para pesquisar colaborador */}
            <Modal
              visible={isModalVisible}
              animationType="slide"
              transparent={true}
              onRequestClose={() => setIsModalVisible(false)}
            >
              <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                <FlatList
                    data={filteredEmployees}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                      <TouchableOpacity onPress={() => onSelectEmployee(item.name, item.id)}>
                        <Text style={styles.suggestion}>{item.name} RE: {item.id}</Text>
                      </TouchableOpacity>
                    )}
                  />
                  <Text style={styles.modalTitle}>Pesquisar Colaborador</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Digite o nome"
                    value={query}
                    onChangeText={onQueryChange}
                  />
                 
                  <TouchableOpacity
                    style={styles.buttonModal}
                    onPress={() => setIsModalVisible(false)} // Fecha o modal
                  >
                    <Text style={styles.buttonText}>Fechar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>

            <View style={styles.buttonsContainer}>
              <TouchableOpacity style={styles.button} onPress={clear}>
                <Text style={styles.buttonText}>Limpar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handleGeneratePDF}>
                <Text style={styles.buttonText}>Exportar </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Code BR | Roberto de Carvalho</Text>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

