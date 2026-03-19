import { useState } from "react";
import AuthForm from "./AuthForm";

interface AuthCredentials {
  username?: string;
  email: string;
  password: string;
}
interface AuthContentProps {
  isLogin: boolean;
  onAuthenticate: (data: AuthCredentials) => Promise<void>;
}

interface InvalidCredentialsType<B> {
  invalidEmail: B;
  invalidPassword: B;
  invalidConfirmPassword: B;
}
interface CredentialsType<S> {
  username: S;
  email: S;
  password: S;
  confirmPassword: S;
}
function AuthContent({ isLogin, onAuthenticate }: AuthContentProps) {
  const [invalidCredentials, setInvalidCredentials] = useState<
    InvalidCredentialsType<boolean>
  >({
    invalidEmail: false,
    invalidPassword: false,
    invalidConfirmPassword: false,
  });
  function submitHandler(credentials: CredentialsType<string>): void {
    const { username, email, password, confirmPassword } = credentials;
    const enteredUsername: string = username.trim();
    const enteredEmail: string = email.trim();
    const enteredPassword: string = password.trim();
    const emailIsValid: boolean = enteredEmail.includes("@");
    const passwordIsValid: boolean = enteredPassword.length > 6;
    const passwordAreEqual: boolean = enteredPassword === confirmPassword;
    if (!emailIsValid || !passwordIsValid || (!isLogin && !passwordAreEqual)) {
      setInvalidCredentials({
        invalidEmail: !emailIsValid,
        invalidPassword: !passwordIsValid,
        invalidConfirmPassword: !passwordIsValid || !passwordAreEqual,
      });
      return;
    }
    if (isLogin) {
      onAuthenticate({
        email: enteredEmail,
        password: enteredPassword,
      });
    } else {
      onAuthenticate({
        username: enteredUsername,
        email: enteredEmail,
        password: enteredPassword,
      });
    }
  }

  return (
    <AuthForm
      isLogin={isLogin}
      onSubmit={submitHandler}
      credentialsIsInvalid={invalidCredentials}
    />
  );
}

export default AuthContent;
