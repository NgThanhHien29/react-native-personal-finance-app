import { View, StyleSheet, Alert } from "react-native";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { authenticate } from "../stores/slices/authSlice";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppDispatch } from "../stores/store";
import { loginUser } from "../services/authService";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import Title from "../components/auth/ui/Title";
import AuthContent from "../components/auth/AuthContent";

export default function LoginScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);
  const storeAuth = async (token: string): Promise<void> => {
    try {
      await AsyncStorage.setItem("token", token);
    } catch (error) {
      Alert.alert("AsyncStorage Wrong!");
    }
  };
  const loginHandler = async (data: { email: string; password: string }) => {
    try {
      setIsAuthenticating(true);
      const { email, password } = data;
      const user = await loginUser({ email, password });
      console.log("User:", user);
      const token: string = user.token;
      const id: number = user.user.id;
      const username: string = user.user.username;
      const emailUser: string = user.user.email;
      await storeAuth(token);
      console.log(user.message);
      dispatch(authenticate({ token, id, username, emailUser })); // bang dong nay
    } catch (error: any) {
      console.log("ERROR:", error.response?.data || error.message);
      Alert.alert("Đăng nhập thất bại", "Sai email hoặc mật khẩu");
    } finally {
      setIsAuthenticating(false);
    }
  };
  if (isAuthenticating) return <LoadingOverlay />;
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.areaTitle}>
          <Title>Personal Finance App</Title>
        </View>
        <View style={styles.areaFormInput}>
          <AuthContent isLogin={true} onAuthenticate={loginHandler} />
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  areaTitle: {
    width: "100%",
  },
  areaFormInput: {
    width: "100%",
    marginTop: 20,
    paddingHorizontal: 20,
  },
});
