import { View, Text, StyleSheet } from "react-native";
import COLORS from "../../../constants/colors";
import { ReactNode } from "react";

function Title({ children }: { children: ReactNode }) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>{children}</Text>
    </View>
  );
}
export default Title;
const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: COLORS.primary,
  },
});
