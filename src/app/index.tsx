import Rejilla from "@/app/components/botones/Rejilla";
import Display from "@/app/components/Display";
import { StyleSheet, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Display />
      <Rejilla />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "#1b1b1b",
  },
});