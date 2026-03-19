import { View, Text, StyleSheet, Image } from "react-native";
import { useSelector } from "react-redux";

import { RootState } from "../stores/store";
import COLORS from "../constants/colors";
import ButtonSetting from "../components/ui/ButtonSetting";
import ButtonLogout from "../components/main/ButtonLogout";

export default function SettingScreen() {
  const username = useSelector(
    (state: RootState) => state.auth.storeUser.username,
  );
  const email = useSelector((state: RootState) => state.auth.storeUser.email);
  return (
    <View style={styles.container}>
      <View style={styles.userView}>
        <Image
          resizeMode="contain"
          source={require("../assets/images/icon_user.png")}
          style={{
            width: 60,
            height: 60,
          }}
        />
        <View
          style={{
            flexDirection: "column",
            marginLeft: 10,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: 600, color: COLORS.text }}>
            {username}
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 400,
              color: COLORS.textLight,
              marginTop: 5,
            }}
          >
            {email}
          </Text>
        </View>
      </View>
      <View style={styles.boxView}>
        <Text style={{ fontSize: 25, fontWeight: 600, color: COLORS.text }}>
          Settings
        </Text>
        <ButtonSetting>Currency: USD</ButtonSetting>
        <ButtonSetting>Theme: Light</ButtonSetting>
        <ButtonSetting>Notifications</ButtonSetting>
      </View>
      <View style={styles.boxView}>
        <Text style={{ fontSize: 25, fontWeight: 600, color: COLORS.text }}>
          About
        </Text>
        <ButtonSetting>Version: 1.0.0</ButtonSetting>
        <ButtonSetting>Privacy Policy</ButtonSetting>
      </View>
      <View style={styles.logoutView}>
        <ButtonLogout />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  userView: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%",
    borderRadius: 20,
    padding: 15,
  },
  boxView: {
    flexDirection: "column",
    marginVertical: 20,
  },
  logoutView: {
    flex: 1,
    justifyContent: "center",
  },
});
