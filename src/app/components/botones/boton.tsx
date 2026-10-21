import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface BotonProps {
  texto: string;
  color?: "light" | "medium" | "accent";
  isDouble?: boolean;
  onPress?: () => void; // Añadido para que el botón sea interactivo
}

const Boton = ({ texto, color = "medium", isDouble, onPress }: BotonProps) => {
  // Definición de colores según la variante
  const backgroundColor = 
    color === "light" ? "#DCEBFA" :
    color === "medium" ? "#B8D8F8" :
    color === "accent" ? "#A8B9F0" : "#C7DDF5";

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.boton,
        { 
          backgroundColor, 
          width: isDouble ? 152 : 64, // Correcto para el botón doble (ej. el cero)
        },
      ]}
    >
      <Text style={styles.text}>
        {texto}
      </Text>
    </TouchableOpacity>
  );
};

export default Boton;

const styles = StyleSheet.create({
  boton: {
    borderRadius: 100,
    height: 64,
    justifyContent: "center",
    alignItems: "center",
    margin: 6, 
  },          
  text: {
    fontSize: 24,
    color: "#263A59",
    fontWeight: "600",
  },
});