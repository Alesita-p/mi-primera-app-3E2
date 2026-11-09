import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

interface BotonProps {
  emoji: string;
  label: string; // El número o símbolo real (ej: '7', '+', '=', etc.)
  onPress: () => void;
  type?: 'number' | 'operator' | 'action' | 'equal';
  color?: string; // Opcional por si quieres forzar un color desde la rejilla
  isWide?: boolean;
}

export default function Boton({ emoji, label, onPress, type = 'number', color, isWide = false }: BotonProps) {
  
  // 🎨 AQUÍ PUEDES CAMBIAR EL COLOR DE CADA BOTÓN DE FORMA INDIVIDUAL
  const getIndividualColor = () => {
    switch (label) {
      // --- Fila de Acciones y División ---
      case 'AC':  return '#22223b'; // Botón de limpiar
      case '+/-': return '#22223b'; // Cambio de signo
      case '%':   return '#22223b'; // Porcentaje
      case '÷':   return '#38385e'; // División

      // --- Fila del 7, 8, 9 y Multiplicación ---
      case '7':   return '#1a1a2e';
      case '8':   return '#1a1a2e';
      case '9':   return '#1a1a2e';
      case '×':   return '#38385e'; // Multiplicación

      // --- Fila del 4, 5, 6 y Resta ---
      case '4':   return '#1a1a2e';
      case '5':   return '#1a1a2e';
      case '6':   return '#1a1a2e';
      case '-':   return '#38385e'; // Resta

      // --- Fila del 1, 2, 3 y Suma ---
      case '1':   return '#1a1a2e';
      case '2':   return '#1a1a2e';
      case '3':   return '#1a1a2e';
      case '+':   return '#38385e'; // Suma

      // --- Fila final: 0, Punto e Igual ---
      case '0':   return '#1a1a2e';
      case '.':   return '#1a1a2e';
      case '=':   return '#ff6b35'; // Botón de igual (Destacado)

      default:    return '#1a1a2e'; // Color por defecto si hubiera otro
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        // Si le pasas un color manual tiene prioridad, si no, usa el color individual de la lista de arriba
        { backgroundColor: color ?? getIndividualColor() },
        isWide && styles.wideButton
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.contentContainer}>
        <Text style={styles.emojiText}>{emoji}</Text>
        <Text style={styles.labelText}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 75,
    height: 75,
    borderRadius: 37.5,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  wideButton: {
    width: 162, // Doble ancho para el cero estilo iPhone
    borderRadius: 37.5,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emojiText: {
    fontSize: 28,
  },
  labelText: {
    position: 'absolute',
    top: -4,
    right: 4,
    color: '#a0a0c0',
    fontSize: 10,
    fontWeight: 'bold',
  },
});