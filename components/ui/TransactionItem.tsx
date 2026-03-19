import { Text, View, StyleSheet, Image } from "react-native";
import COLORS from "../../constants/colors";

interface TransactionItemProps {
  id: number;
  amount: number;
  type: string;
  created_at: string;
  category_name: string;
  color: string;
}
function TransactionItem({
  id,
  amount,
  type,
  created_at,
  category_name,
  color,
}: TransactionItemProps) {
  let colorType: string;
  if (type === "income") {
    colorType = COLORS.primaryDark;
  } else {
    colorType = COLORS.secondaryDark;
  }
  return (
    <View style={styles.container}>
      <View style={[styles.dot, { backgroundColor: color }]}>
        <Image
          source={require("../../assets/images/icon_money.png")}
          style={styles.dotIcon}
          resizeMode="contain"
        />
      </View>
      <View style={styles.action}>
        <Text style={styles.textCategory}>{category_name}</Text>
        <Text style={styles.textDate}>{created_at}</Text>
        <Text>stt:{id}</Text>
      </View>
      <Text style={[styles.textMoney, { color: colorType }]}>${amount}</Text>
    </View>
  );
}

export default TransactionItem;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 10,
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.textLight,
  },
  dot: {
    width: 34,
    height: 34,
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  dotIcon: {
    width: 25,
    height: 25,
  },
  action: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  textCategory: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
  },
  textDate: {
    fontSize: 12,
    fontWeight: "500",
    color: COLORS.textLight,
  },
  textStt: {
    fontSize: 8,
    fontWeight: "400",
    color: COLORS.textLighter,
  },
  textMoney: {
    fontSize: 20,
    fontWeight: "700",
    width: 90,
  },
});
