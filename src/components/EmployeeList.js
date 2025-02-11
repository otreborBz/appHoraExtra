import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../style';

// Ordem fixa dos postos de trabalho
export const workStationOrder = [
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
];

export const EmployeeList = ({ employees, onRemoveEmployee }) => {
  console.log('Received employees:', employees);

  if (employees.length === 0) {
    return (
      <View style={styles.emptyListContainer}>
        <Icon name="work-outline" size={48} color="#999" />
        <Text style={styles.emptyListText}>
          Nenhum posto de trabalho adicionado{'\n'}
          Clique em "Adicionar" para começar
        </Text>
      </View>
    );
  }

  // Criar mapa de funcionários por posto
  const employeeMap = employees.reduce((map, emp) => {
    map[emp.workStation] = emp;
    return map;
  }, {});

  // Filtrar apenas os postos que têm funcionários e ordenar conforme workStationOrder
  const orderedEmployees = workStationOrder
    .filter(station => employeeMap[station])
    .map(station => employeeMap[station]);

  return (
    <View style={styles.employeeListWrapper}>
      <ScrollView 
        style={styles.employeeListContainer}
        contentContainerStyle={styles.employeeListContent}
        showsVerticalScrollIndicator={false}
      >
        {orderedEmployees.map((employee) => (
          <View key={employee.workStation} style={styles.employeeListItem}>
            <View style={styles.stationInfo}>
              <Text style={styles.stationName}>{employee.workStation}</Text>
              <View style={styles.employeeInfo}>
                <Text style={styles.employeeName}>
                  {employee.name} (RE: {employee.id})
                </Text>
                <TouchableOpacity 
                  onPress={() => onRemoveEmployee(employee.workStation)}
                  style={styles.removeButton}
                >
                  <Icon name="close" size={20} color="#ff4444" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}; 