import { View, Text, StyleSheet } from "react-native";
import { ReactNode } from "react";
import COLORS from "../../constants/colors";

interface TransactionInput {
  children: ReactNode;
  title: string;
}
function TransactionInput({ children, title }: TransactionInput) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title} *</Text>
      <View style={styles.areaInput}>{children}</View>
    </View>
  );
}
export default TransactionInput;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "flex-start",
    marginVertical: 10,
  },
  title: {
    fontSize: 16,
    color: COLORS.text,
    fontWeight: 600,
    marginBottom: 8,
  },
  areaInput: {
    borderWidth: 1,
    borderColor: COLORS.textLight,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 12,
    width: "100%",
  },
});
