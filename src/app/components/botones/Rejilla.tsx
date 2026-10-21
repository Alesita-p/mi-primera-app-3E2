import Boton from "@/app/components/botones/boton";
import { StyleSheet, View } from "react-native";

const Rejilla = () => {
  return (
    <View style={styles.container}>
      {/* Fila 1: AC, +/-, %, ÷ */}
      <View style={styles.fila}>
        <Boton texto="AC" color="light" />
        <Boton texto="+/-" color="light" />
        <Boton texto="%" color="light" />
        <Boton texto="÷" color="accent" />
      </View>

      {/* Fila 2: 7, 8, 9, × */}
      <View style={styles.fila}>
        <Boton texto="7" />
        <Boton texto="8" />
        <Boton texto="9" />
        <Boton texto="×" color="accent" />
      </View>

      {/* Fila 3: 4, 5, 6, - */}
      <View style={styles.fila}>
        <Boton texto="4" />
        <Boton texto="5" />
        <Boton texto="6" />
        <Boton texto="-" color="accent" />
      </View>

      {/* Fila 4: 1, 2, 3, + */}
      <View style={styles.fila}>
        <Boton texto="1" />
        <Boton texto="2" />
        <Boton texto="3" />
        <Boton texto="+" color="accent" />
      </View>

      {/* Fila 5: 0 (doble), ., = */}
      <View style={styles.fila}>
        <Boton texto="0" isDouble />
        <Boton texto="." />
        <Boton texto="=" color="accent" />
      </View>
    </View>
  );
};

export default Rejilla;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 20,
    alignItems: "center",
  },
  fila: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16, 
    marginBottom: 15,
    width: "100%",
  },
});