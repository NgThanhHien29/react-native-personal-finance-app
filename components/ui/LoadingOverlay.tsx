import { View, ActivityIndicator, StyleSheet } from "react-native";
import COLORS from "../../constants/colors";

function LoadingOverlay() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={"large"} color={COLORS.primaryDark} />
    </View>
  );
}

export default LoadingOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
