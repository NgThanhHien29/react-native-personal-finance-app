import { Pressable, StyleSheet, Text } from "react-native";

import COLORS from "../../../constants/colors";

interface ButtonProps {
  isLogin: boolean;
  onSubmit: () => void;
}

function Button({ isLogin, onSubmit }: ButtonProps) {
  return (
    <Pressable
      onPress={onSubmit}
      style={({ pressed }) => [styles.wrapperButton, pressed && styles.pressed]}
    >
      <Text style={styles.textButton}>{isLogin ? "Đăng Nhập" : "Đăng Kí"}</Text>
    </Pressable>
  );
}

export default Button;

const styles = StyleSheet.create({
  wrapperButton: {
    width: "100%",
    backgroundColor: COLORS.primary,
    padding: 16,
    alignItems: "center",
    marginTop: 4,
    borderRadius: 8,
  },
  pressed: {
    opacity: 0.8,
  },
  textButton: {
    color: COLORS.surface,
    fontSize: 20,
    fontWeight: "bold",
  },
});
