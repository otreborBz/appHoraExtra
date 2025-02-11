import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../style';

export const DateTimeInputs = ({
  date,
  setDate,
  entryTime,
  setEntryTime,
  exitTime,
  setExitTime,
}) => {
  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const [showEntryTimePicker, setShowEntryTimePicker] = React.useState(false);
  const [showExitTimePicker, setShowExitTimePicker] = React.useState(false);

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

  const formatDate = (date) => {
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (time) => {
    return time.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <View style={styles.dateTimeContainer}>
      <View style={styles.dateSection}>
        <Text style={styles.sectionTitle}>Data</Text>
        <TouchableOpacity 
          style={styles.dateSelector}
          onPress={() => setShowDatePicker(true)}
        >
          <Icon name="calendar-today" size={24} color="#666" />
          <Text style={styles.dateText}>
            {formatDate(date)}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.timeSection}>
        <Text style={styles.sectionTitle}>Horário</Text>
        <View style={styles.timeSelectors}>
          <TouchableOpacity 
            style={styles.timeSelector}
            onPress={() => setShowEntryTimePicker(true)}
          >
            <View style={styles.timeSelectorHeader}>
              <Icon name="access-time" size={20} color="#666" />
              <Text style={styles.timeLabelText}>Entrada</Text>
            </View>
            <Text style={styles.timeText}>{formatTime(entryTime)}</Text>
          </TouchableOpacity>

          <Icon name="arrow-forward" size={24} color="#666" style={styles.timeArrow} />

          <TouchableOpacity 
            style={styles.timeSelector}
            onPress={() => setShowExitTimePicker(true)}
          >
            <View style={styles.timeSelectorHeader}>
              <Icon name="access-time" size={20} color="#666" />
              <Text style={styles.timeLabelText}>Saída</Text>
            </View>
            <Text style={styles.timeText}>{formatTime(exitTime)}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}

      {showEntryTimePicker && (
        <DateTimePicker
          value={entryTime}
          mode="time"
          display="default"
          onChange={onEntryTimeChange}
        />
      )}

      {showExitTimePicker && (
        <DateTimePicker
          value={exitTime}
          mode="time"
          display="default"
          onChange={onExitTimeChange}
        />
      )}
    </View>
  );
}; 