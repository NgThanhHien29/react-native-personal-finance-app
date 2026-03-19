import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { ReactNode } from "react";

import AntDesign from "@expo/vector-icons/AntDesign";
import COLORS from "../../constants/colors";

function ButtonSetting({ children }: { children: ReactNode }) {
  return (
    <TouchableOpacity>
      <View style={styles.container}>
        <Text style={styles.text}>{children}</Text>
        <AntDesign name="right" size={24} color="black" />
      </View>
    </TouchableOpacity>
  );
}
export default ButtonSetting;
const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 12,
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    marginVertical: 5,
  },
  text: {
    fontSize: 20,
    fontWeight: 500,
    color: COLORS.text,
  },
});
