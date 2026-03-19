import { Pressable, Text, StyleSheet } from "react-native";
import { ReactNode } from "react";
import COLORS from "../../constants/colors";

type TypeTransaction = "expense" | "income";
interface TypeTransactionButtonProps {
  children: ReactNode;
  valueType: "expense" | "income";
  onChosenType: (type: TypeTransaction) => void;
  colorType: TypeTransaction;
}

function TypeTransactionButton({
  children,
  valueType,
  onChosenType,
  colorType,
}: TypeTransactionButtonProps) {
  const colorBackground: string =
    colorType === valueType ? COLORS.primary : "white";
  const colorText: string =
    colorBackground === "white" ? COLORS.primary : "white";
  return (
    <Pressable
      onPress={() => onChosenType(valueType)}
      style={({ pressed }) => [
        styles.outerContainer,
        { backgroundColor: colorBackground },
        pressed && styles.pressed,
      ]}
    >
      <Text style={[styles.text, { color: colorText }]}>{children}</Text>
    </Pressable>
  );
}
export default TypeTransactionButton;

const styles = StyleSheet.create({
  outerContainer: {
    width: 170,
    padding: 15,
    backgroundColor: "white",
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.textLighter,
    marginVertical: 20,
  },
  pressed: {
    opacity: 0.9,
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: "700",
  },
});
