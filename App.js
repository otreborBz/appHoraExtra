import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';

export default function App() {
  const [line, setLine] = useState();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Hora extra</Text>
            <Text style={styles.subtitle}>Organization</Text>
          </View>

          <View style={styles.pickerRow}>
            <Text style={styles.label}>Selecione a Linha:</Text>
            <Picker
              selectedValue={line}
              onValueChange={(itemValue) => setLine(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="G" value="G" />
              <Picker.Item label="H" value="H" />
              <Picker.Item label="J" value="J" />
              <Picker.Item label="K" value="K" />
              <Picker.Item label="N" value="N" />
            </Picker>
          </View>

          <View style={styles.inputsContainer}>
            {[
              'Isoladora de ranhura 1',
              'Isoladora de ranhura 2',
              'Abastecimento',
              'Isolação H',
              'HTM 1',
              'HTM 2',
              'HTM 3',
              'Tubo',
              'Embutição 1',
              'Embutição 2',
              'Costura 1',
              'Costura 2',
              'Examinação',
              'Teste final',
              'Recuperação',
              'Preparador',
            ].map((label, index) => (
              <View key={index} style={styles.inputGroup}>
                <Text style={styles.inputLabel}>{label}</Text>
                <TextInput
                  placeholder="Nome do colaborador"
                  style={styles.input}
                />
               
              </View>
            ))}
          </View>

          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Limpar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Exportar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  scrollContent: {
    paddingBottom: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
  },
  pickerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginRight: 8,
  },
  picker: {
    width: '30%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  inputsContainer: {
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 16,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginBottom: 4,
  },
  inputLabel: {
    fontSize: 14,
    color: '#555',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    backgroundColor: '#007bff',
    padding: 12,
    marginHorizontal: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
