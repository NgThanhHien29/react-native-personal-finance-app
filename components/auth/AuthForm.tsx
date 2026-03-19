import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";

import COLORS from "../../constants/colors";
import { RootAuthStackParamList } from "../../types/type_navigation";
import Input from "./ui/Input";
import Button from "./ui/Button";
import FlatButton from "./ui/FlatButton";

interface CredentialsType<S> {
  username: S;
  email: S;
  password: S;
  confirmPassword: S;
}

interface InvalidCredentialsType<B> {
  invalidEmail: B;
  invalidPassword: B;
  invalidConfirmPassword: B;
}

interface AuthFormProps {
  isLogin: boolean;
  onSubmit: (credentials: CredentialsType<string>) => void;
  credentialsIsInvalid: InvalidCredentialsType<boolean>;
}

type AuthFormNavigationProp = NativeStackNavigationProp<RootAuthStackParamList>;

type ModeInputType = "username" | "email" | "password" | "confirmPassword";

function AuthForm({ isLogin, onSubmit, credentialsIsInvalid }: AuthFormProps) {
  const navigation = useNavigation<AuthFormNavigationProp>();
  const { invalidEmail, invalidPassword, invalidConfirmPassword } =
    credentialsIsInvalid;
  const [enteredUsername, setEnteredUsername] = useState<string>("");
  const [enteredEmail, setEnteredEmail] = useState<string>("");
  const [enteredPassword, setEnteredPassword] = useState<string>("");
  const [enteredConfirmPassword, setEnteredConfirmPassword] =
    useState<string>("");
  function switchAuthModeHandler() {
    if (isLogin) {
      navigation.navigate("Signup");
    } else {
      navigation.goBack();
    }
  }
  function updateValueHandler(
    modeInput: ModeInputType,
    inputValue: string,
  ): void {
    switch (modeInput) {
      case "username":
        setEnteredUsername(inputValue);
        break;
      case "email":
        setEnteredEmail(inputValue);
        break;
      case "password":
        setEnteredPassword(inputValue);
        break;
      case "confirmPassword":
        setEnteredConfirmPassword(inputValue);
        break;
    }
  }
  const submitHandler = (): void => {
    onSubmit({
      username: enteredUsername,
      email: enteredEmail,
      password: enteredPassword,
      confirmPassword: enteredConfirmPassword,
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.areaInputLogin}>
        {!isLogin && (
          <Input
            label="Username"
            value={enteredUsername}
            onUpdateValue={(input) => updateValueHandler("username", input)}
            keyboardType="default"
            isInvalid={false}
          />
        )}
        <Input
          label="Nhập Email"
          value={enteredEmail}
          onUpdateValue={(input) => updateValueHandler("email", input)}
          keyboardType="email-address"
          isInvalid={invalidEmail}
        />

        <Input
          label="Nhập mật khẩu"
          value={enteredPassword}
          onUpdateValue={(input) => updateValueHandler("password", input)}
          secure={true}
          isInvalid={invalidPassword}
        />
        {!isLogin && (
          <Input
            label="Nhập lại mật khẩu"
            value={enteredConfirmPassword}
            onUpdateValue={(input) =>
              updateValueHandler("confirmPassword", input)
            }
            secure={true}
            isInvalid={invalidConfirmPassword}
          />
        )}
        <Button isLogin={isLogin} onSubmit={submitHandler} />
      </View>
      <View style={styles.areaSignupButton}>
        <FlatButton
          isLogin={isLogin}
          onSwitchAuthMode={switchAuthModeHandler}
        />
      </View>
    </View>
  );
}
export default AuthForm;
const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    borderRadius: 10,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
  },
  areaInputLogin: {
    width: "100%",
    alignItems: "center",
  },
  areaSignupButton: {
    width: "100%",
    alignItems: "center",
    height: 100,
    paddingVertical: 20,
  },
});
