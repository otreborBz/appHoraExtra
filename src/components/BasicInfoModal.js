import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import { LineSelector } from './LineSelector';
import { DateTimeInputs } from './DateTimeInputs';
import styles from '../style';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const BasicInfoModal = ({ visible, onClose, formHook }) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Informações Básicas</Text>
            <TouchableOpacity onPress={onClose}>
              <Icon name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>

          <LineSelector 
            line={formHook.line} 
            setLine={formHook.setLine} 
          />
          
          <DateTimeInputs {...formHook} />

          <TouchableOpacity 
            style={styles.confirmButton}
            onPress={onClose}
          >
            <Text style={styles.buttonText}>Confirmar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}; 