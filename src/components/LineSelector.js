import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../style';

const productionLines = ['G', 'H', 'J', 'K', 'N'];

export const LineSelector = ({ line, setLine }) => {
  return (
    <View style={styles.lineContainer}>
      <Text style={styles.sectionTitle}>Linha de Produção</Text>
      <View style={styles.lineButtonsContainer}>
        {productionLines.map((lineOption) => (
          <TouchableOpacity
            key={lineOption}
            style={[
              styles.lineButton,
              line === lineOption && styles.lineButtonActive
            ]}
            onPress={() => setLine(lineOption)}
          >
            <Text style={[
              styles.lineButtonText,
              line === lineOption && styles.lineButtonTextActive
            ]}>
              {lineOption}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}; 