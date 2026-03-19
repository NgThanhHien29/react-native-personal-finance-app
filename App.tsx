import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { Image, Alert } from "react-native";
import { useState, useEffect } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";
import { RootState } from "./stores/store";
import { store } from "./stores/store";
import AddTransactionScreen from "./screens/AddTransactionScreen";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import SettingScreen from "./screens/SettingScreen";
import SignupScreen from "./screens/SignupScreen";
import StatisticsScreen from "./screens/StatisticsScreen";
import {
  RootCompositeParamList,
  RootAuthStackParamList,
} from "./types/type_navigation";
import COLORS from "./constants/colors";

const Stack = createNativeStackNavigator<RootCompositeParamList>();
const StackAuth = createNativeStackNavigator<RootAuthStackParamList>();
const Tab = createBottomTabNavigator();

const AuthStack = () => {
  return (
    <StackAuth.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}
    >
      <StackAuth.Screen name="Signup" component={SignupScreen} />
      <StackAuth.Screen name="Login" component={LoginScreen} />
    </StackAuth.Navigator>
  );
};

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: {
          backgroundColor: "#fff",
        },
        animation: "slide_from_bottom",
        headerStyle: {
          backgroundColor: COLORS.primary,
        },
        headerTintColor: "#fff",
      }}
    >
      <Stack.Screen
        name="HomeMain"
        component={HomeScreen}
        options={{
          title: "Finance App",
        }}
      />
      <Stack.Screen name="AddTransaction" component={AddTransactionScreen} />
    </Stack.Navigator>
  );
};

const StatisticsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        title: "Statistics",
        headerTintColor: "white",
        headerStyle: {
          backgroundColor: COLORS.primary,
        },
      }}
    >
      <Stack.Screen name="StatisticsMain" component={StatisticsScreen} />
    </Stack.Navigator>
  );
};

const SettingStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        title: "Settings",
        headerTintColor: "white",
        headerStyle: {
          backgroundColor: COLORS.primary,
        },
      }}
    >
      <Stack.Screen name="SettingMain" component={SettingScreen} />
    </Stack.Navigator>
  );
};

const AppTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: COLORS.secondaryLight,
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          height: 60,
          paddingTop: 10,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: () => {
            return (
              <Image
                style={{ width: 40, height: 40 }}
                source={require("./assets/images/icon_homepage.png")}
                resizeMode="contain"
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Statistics"
        component={StatisticsStack}
        options={{
          tabBarIcon: () => {
            return (
              <Image
                style={{ width: 40, height: 40 }}
                source={require("./assets/images/icon_statistics.png")}
                resizeMode="contain"
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Setting"
        component={SettingStack}
        options={{
          tabBarIcon: () => {
            return (
              <Image
                style={{ width: 40, height: 40 }}
                source={require("./assets/images/icon_setting.png")}
                resizeMode="contain"
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

const Navigation = () => {
  const isLogin: boolean = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );
  return (
    <NavigationContainer>
      {isLogin ? <AppTabs /> : <AuthStack />}
    </NavigationContainer>
  );
};

const Root = () => {
  const [isTryingLogin, setIsTryingLogin] = useState(true);
  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
    async function fetchToken() {
      try {
        const token = await AsyncStorage.getItem("token");
        console.log("TOKEN:", token);
      } catch {
        Alert.alert("Fetch token Error");
      } finally {
        setIsTryingLogin(false);
      }
    }
    fetchToken();
  }, []);
  useEffect(() => {
    if (!isTryingLogin) {
      SplashScreen.hideAsync();
    }
  }, [isTryingLogin]);
  return (
    <SafeAreaProvider>
      <Navigation />
    </SafeAreaProvider>
  );
};

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <Provider store={store}>
        <Root />
      </Provider>
    </>
  );
}
