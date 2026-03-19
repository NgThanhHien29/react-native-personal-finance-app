import { Pressable, Text, StyleSheet, DimensionValue } from "react-native";
import { ReactNode } from "react";
import COLORS from "../../constants/colors";

interface TransactionButtonProps {
  children: ReactNode;
  onPress: () => void;
  width?: DimensionValue;
  type: "submit" | "cancel";
}
function TransactionButton({
  children,
  onPress,
  width = "100%",
  type,
}: TransactionButtonProps) {
  const background: string = type === "submit" ? COLORS.primary : "white";
  const text: string = type === "submit" ? "white" : COLORS.text;
  return (
    <Pressable
      onPress={onPress}
      style={[styles.button, { width, backgroundColor: background }]}
    >
      <Text style={[styles.textButton, { color: text }]}>{children}</Text>
    </Pressable>
  );
}
export default TransactionButton;

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    borderWidth: 1,
    borderColor: COLORS.textLighter,
    marginVertical: 10,
  },
  textButton: {
    fontSize: 24,
    fontWeight: "700",
  },
});
