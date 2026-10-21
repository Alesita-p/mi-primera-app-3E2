import { StyleSheet, Text, View } from 'react-native';

const Display = () => {
  return (
    <View style={styles.display}>
      {/* Arriba de la línea: La operación que da 0 (ej. suma de prueba) */}
      <Text style={styles.subResult} numberOfLines={1} adjustsFontSizeToFit>
        5 - 5 =
      </Text>
      
      {/* Línea divisoria sutil */}
      <View style={styles.lineaDivisoria} />

      {/* Abajo: El total principal que es 0 en grande */}
      <Text style={styles.result} numberOfLines={1} adjustsFontSizeToFit>
        0
      </Text>
    </View>
  );
};

export default Display;

const styles = StyleSheet.create({
  display: {
    width: "100%",
    paddingHorizontal: 24,
    paddingVertical: 10,
    justifyContent: "flex-end", 
    height: 130, 
  },
  subResult: {
    color: "#94a3b8", 
    fontSize: 24,
    textAlign: "right",
    marginBottom: 6,
  },
  lineaDivisoria: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.1)", 
    width: "100%",
    marginBottom: 6,
  },
  result: {
    color: "#dfe4ec",
    fontSize: 64,
    textAlign: "right",
    fontWeight: "bold",
  },
});