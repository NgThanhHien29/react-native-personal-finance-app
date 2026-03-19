import { NavigatorScreenParams } from "@react-navigation/native";
// Dinh nghia cho can man hinh trong Auth Stack
export type RootAuthStackParamList = {
  Signup: undefined;
  Login: undefined;
};

export type RootMainStackParamList = {
  HomeMain: undefined;
  AddTransaction: undefined;
};

export type RootStatisticsStackParmList = {
  StatisticsMain: undefined;
};

export type RootSettingStackParamList = {
  SettingMain: undefined;
};

export type AppTabsParamList = {
  Home: NavigatorScreenParams<RootMainStackParamList>;
  Statistics: NavigatorScreenParams<RootStatisticsStackParmList>;
  Setting: NavigatorScreenParams<RootSettingStackParamList>;
};

export type RootCompositeParamList = AppTabsParamList &
  RootMainStackParamList &
  RootStatisticsStackParmList &
  RootSettingStackParamList;
