import React from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import styles from '../style';

export const EmployeeSearchModal = ({
  isModalVisible,
  setIsModalVisible,
  query,
  onQueryChange,
  filteredEmployees,
  activeInput,
  setFormData,
}) => {
  const onSelectEmployee = (name, id) => {
    setFormData((prev) => ({
      ...prev,
      [activeInput]: `${name} (RE: ${id})`,
    }));
    setIsModalVisible(false);
  };

  return (
    <Modal
      visible={isModalVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setIsModalVisible(false)}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Pesquisar Colaborador</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Digite o nome do colaborador"
            value={query}
            onChangeText={onQueryChange}
            autoFocus={true}
          />
          {filteredEmployees.length > 0 ? (
            <FlatList
              data={filteredEmployees}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={styles.suggestionItem}
                  onPress={() => onSelectEmployee(item.name, item.id)}
                >
                  <Text style={styles.suggestionText}>{item.name}</Text>
                  <Text style={styles.suggestionRE}>RE: {item.id}</Text>
                </TouchableOpacity>
              )}
            />
          ) : query.length > 0 ? (
            <Text style={styles.noResults}>Nenhum colaborador encontrado</Text>
          ) : null}
          
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setIsModalVisible(false)}
          >
            <Text style={styles.buttonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}; 