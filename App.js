import React, { useState } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  Image
} from 'react-native';
import styles from './src/style.js';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import generatePDF from './src/pdf';  // Importando a função corretamente

export default function App() {
  const [line, setLine] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
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

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const clear = () => {
    setLine('');
    setDate(new Date());
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
    await generatePDF(line, date, formData); 
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Image source={require('./src/assets/logo.png')} style={styles.image} />
          <View style={styles.text}>
            <Text style={styles.title}>Hora extra</Text>
            <Text style={styles.subtitle}>Organization</Text>
          </View>
        </View>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          

          <View style={styles.pickerRow}>
            <Text style={styles.label}>Linha:</Text>
            <Picker
              selectedValue={line}
              onValueChange={(itemValue) => setLine(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Selecione uma linha" value="" />
              <Picker.Item label="G" value="G" />
              <Picker.Item label="H" value="H" />
              <Picker.Item label="J" value="J" />
              <Picker.Item label="K" value="K" />
              <Picker.Item label="N" value="N" />
            </Picker>

            <Text style={styles.label}>Data:</Text>
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={styles.dateButtonText}>
                {date.toLocaleDateString('pt-BR')}
              </Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={onDateChange}
              />
            )}
          </View>

          <View style={styles.inputsContainer}>
            {Object.keys(formData).map((label, index) => (
              <View key={index} style={styles.inputGroup}>
                <Text style={styles.inputLabel}>{label}</Text>
                <TextInput
                  placeholder="Nome do colaborador"
                  style={styles.input}
                  value={formData[label]}
                  onChangeText={(text) =>
                    setFormData({ ...formData, [label]: text })
                  }
                />
              </View>
            ))}
          </View>

          
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.button} onPress={clear}>
              <Text style={styles.buttonText}>Limpar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleGeneratePDF}>
              <Text style={styles.buttonText}>Exportar PDF</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.footer}>
            <Text style={styles.footerText}>Code BR | Roberto de Carvalho</Text>
          </View>
          
        </ScrollView>

        
        
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
