import { Pressable, Text, StyleSheet } from "react-native";

import COLORS from "../../../constants/colors";

interface FlatButtonProps {
  isLogin: boolean;
  onSwitchAuthMode: () => void;
}
function FlatButton({ isLogin, onSwitchAuthMode }: FlatButtonProps) {
  return (
    <Pressable
      onPress={onSwitchAuthMode}
      style={({ pressed }) => [styles.wrapperButton, pressed && styles.pressed]}
    >
      <Text style={styles.textButton}>
        {isLogin ? "Tạo tài khoản mới!Signup" : "Đã có tài khoản!Login"}
      </Text>
    </Pressable>
  );
}
export default FlatButton;
const styles = StyleSheet.create({
  wrapperButton: {
    alignItems: "center",
  },
  pressed: {
    opacity: 0.8,
  },
  textButton: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: "400",
    padding: 8,
  },
});
