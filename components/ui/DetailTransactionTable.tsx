import { View, Text, StyleSheet } from "react-native";
import COLORS from "../../constants/colors";

interface DetailTransactionTableProps {
  title: string;
  transactionTotal: string;
}
function DetailTransactionTable({
  title,
  transactionTotal,
}: DetailTransactionTableProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.headerBox}>{title}</Text>
      <Text style={styles.transactionNumber}>${transactionTotal}</Text>
    </View>
  );
}

export default DetailTransactionTable;
const styles = StyleSheet.create({
  container: {
    width: 150,
    padding: 15,
    backgroundColor: COLORS.primaryLight,
    borderRadius: 15,
    shadowColor: "#e63636",
    shadowOffset: { width: 4, height: 1 },
    shadowOpacity: 0.7,
    shadowRadius: 5,
  },
  headerBox: {
    color: COLORS.textLighter,
    fontSize: 16,
    fontWeight: "400",
  },
  transactionNumber: {
    fontSize: 24,
    fontWeight: "600",
    color: COLORS.surface,
  },
});
