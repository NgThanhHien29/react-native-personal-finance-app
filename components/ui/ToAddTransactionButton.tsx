import { TouchableOpacity, StyleSheet, Image } from "react-native";
import COLORS from "../../constants/colors";

function ToAddTransactionButton({ onNavigate }: { onNavigate: () => void }) {
  return (
    <TouchableOpacity style={styles.fixedButton} onPress={onNavigate}>
      <Image
        source={require("../../assets/images/icon_addition.png")}
        style={{ width: 60, height: 60 }}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
}
export default ToAddTransactionButton;
const styles = StyleSheet.create({
  fixedButton: {
    position: "absolute",
    bottom: 5,
    right: 5,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});
