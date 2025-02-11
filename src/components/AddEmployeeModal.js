import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styles from '../style';
import { workStationOrder } from './EmployeeList';

export const AddEmployeeModal = ({
  visible,
  onClose,
  onAddEmployee,
  employees,
  colaboradores,
}) => {
  const [selectedStation, setSelectedStation] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  // Filtra as estações que já foram usadas, mantendo a ordem original
  const unusedStations = workStationOrder.filter(
    station => !employees.some(emp => emp.workStation === station)
  );

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text.length > 0) {
      const filtered = colaboradores.filter(emp =>
        emp.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredEmployees(filtered);
    } else {
      setFilteredEmployees([]);
    }
  };

  const handleSelectEmployee = (employee) => {
    if (!selectedStation) {
      alert('Selecione um posto de trabalho primeiro');
      return;
    }
    
    const newEmployee = {
      ...employee,
      workStation: selectedStation,
    };
    
    console.log('Adding employee:', newEmployee); // Log para debug
    onAddEmployee(newEmployee);
    
    // Limpa os estados
    setSelectedStation('');
    setSearchQuery('');
    setFilteredEmployees([]);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Adicionar Posto de Trabalho</Text>

          <View style={styles.pickerContainer}>
            <Text style={styles.label}>Selecione o Posto:</Text>
            <Picker
              selectedValue={selectedStation}
              onValueChange={setSelectedStation}
              style={styles.picker}
            >
              <Picker.Item label="Selecione um posto" value="" />
              {unusedStations.map((station) => (
                <Picker.Item key={station} label={station} value={station} />
              ))}
            </Picker>
          </View>

          {selectedStation && (
            <>
              <Text style={styles.label}>Selecione o Colaborador:</Text>
              <TextInput
                style={styles.searchInput}
                placeholder="Buscar colaborador por nome"
                value={searchQuery}
                onChangeText={handleSearch}
              />

              <FlatList
                data={filteredEmployees}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.employeeItem}
                    onPress={() => handleSelectEmployee(item)}
                  >
                    <Text style={styles.employeeName}>{item.name}</Text>
                    <Text style={styles.employeeId}>RE: {item.id}</Text>
                  </TouchableOpacity>
                )}
                style={styles.employeeList}
              />
            </>
          )}

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.buttonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}; 