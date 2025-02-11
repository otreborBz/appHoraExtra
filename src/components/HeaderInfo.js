import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../style';

export const HeaderInfo = ({ formHook }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDate = (date) => {
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit'
    });
  };

  const formatTime = (time) => {
    return time.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <View style={styles.headerInfoContainer}>
      <TouchableOpacity 
        style={styles.headerInfoSummary}
        onPress={() => setIsExpanded(!isExpanded)}
      >
        <View style={styles.headerInfoMain}>
          <Text style={styles.headerInfoTitle}>
            {formHook.line ? `Linha ${formHook.line}` : 'Selecione a linha'}
          </Text>
          <Text style={styles.headerInfoSubtitle}>
            {formatDate(formHook.date)} • {formatTime(formHook.entryTime)} - {formatTime(formHook.exitTime)}
          </Text>
        </View>
        <Icon 
          name={isExpanded ? "expand-less" : "expand-more"} 
          size={24} 
          color="#666"
        />
      </TouchableOpacity>

      {isExpanded && (
        <View style={styles.headerInfoExpanded}>
          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => formHook.setShowBasicInfoModal(true)}
          >
            <Icon name="edit" size={20} color="#fff" />
            <Text style={styles.editButtonText}>Editar Informações</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}; 