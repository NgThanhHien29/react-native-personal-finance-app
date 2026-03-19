import { TextInput, StyleSheet } from "react-native";
import { ComponentProps } from "react";

import { useState } from "react";
import COLORS from "../../../constants/colors";

interface InputProps {
  label: string;
  value: string;
  onUpdateValue: (input: string) => void;
  secure?: boolean;
  keyboardType?: ComponentProps<typeof TextInput>["keyboardType"];
  isInvalid: boolean;
}
function Input({
  label,
  value,
  onUpdateValue,
  secure,
  keyboardType,
  isInvalid,
}: InputProps) {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  return (
    <TextInput
      placeholder={label}
      value={value}
      onChangeText={(entered) => onUpdateValue(entered)}
      secureTextEntry={secure}
      keyboardType={keyboardType}
      placeholderTextColor={COLORS.textLight}
      autoCapitalize="none"
      style={[
        styles.inputStyle,
        isFocus && styles.inputFocus,
        isInvalid && styles.isInvalid,
      ]}
      onFocus={() => {
        setIsFocus(true);
      }}
      onBlur={() => {
        setIsFocus(false);
      }}
    />
  );
}
export default Input;

const styles = StyleSheet.create({
  inputStyle: {
    width: "100%",
    fontSize: 20,
    padding: 8,
    marginBottom: 16,
    backgroundColor: COLORS.surface,
    borderColor: COLORS.textLighter,
    borderWidth: 1,
    borderRadius: 8,
  },
  inputFocus: {
    borderColor: COLORS.primary,
    borderWidth: 1,
  },
  isInvalid: {
    borderColor: "red",
  },
});
