import { Text, StyleSheet } from "react-native";
import { ReactNode } from "react";

function HeaderTitle({ children }: { children: ReactNode }) {
  return <Text style={styles.text}>{children}</Text>;
}

export default HeaderTitle;

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    color: "white",
    fontWeight: "500",
  },
});
