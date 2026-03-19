import { Pressable, Text, StyleSheet } from "react-native";
import COLORS from "../../constants/colors";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { logout } from "../../stores/slices/authSlice";
import { RootAuthStackParamList } from "../../types/type_navigation";
import { AppDispatch } from "../../stores/store";

type ButtonLogoutStackNavigationProp =
  NativeStackNavigationProp<RootAuthStackParamList>;
function ButtonLogout() {
  const navigation = useNavigation<ButtonLogoutStackNavigationProp>();
  const dispatch = useDispatch<AppDispatch>();
  function logoutHandler() {
    dispatch(logout());
    navigation.navigate("Login");
  }
  return (
    <Pressable style={styles.buttonContainer} onPress={logoutHandler}>
      <Text style={{ color: COLORS.surface, fontSize: 20 }}>Logout</Text>
    </Pressable>
  );
}
export default ButtonLogout;

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: COLORS.primary,
    width: "100%",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
});
