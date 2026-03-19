import { Alert } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { RootAuthStackParamList } from "../types/type_navigation";
import { createUser } from "../services/authService";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import Title from "../components/auth/ui/Title";
import AuthContent from "../components/auth/AuthContent";

type AuthStackNavigationProp = NativeStackNavigationProp<
  RootAuthStackParamList,
  "Signup"
>;
export default function SignupScreen() {
  const navigation = useNavigation<AuthStackNavigationProp>();
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);
  async function signupHandler(data: {
    username?: string;
    email: string;
    password: string;
  }): Promise<void> {
    try {
      setIsAuthenticating(true);
      const newUser = await createUser({
        username: data.username!,
        email: data.email,
        password: data.password,
      });

      if (newUser) Alert.alert("Đăng kí thành công");
      console.log("New User:", newUser.id, newUser.username, newUser.email);
      navigation.navigate("Login");
    } catch (error: any) {
      Alert.alert("Nhập Sai!", "Kiểm tra giá trị nhập");
    } finally {
      setIsAuthenticating(false);
    }
  }
  if (isAuthenticating) return <LoadingOverlay />;
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.areaTitle}>
          <Title>Personal Finance App</Title>
        </View>
        <View style={styles.areaFormInput}>
          <AuthContent isLogin={false} onAuthenticate={signupHandler} />
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
