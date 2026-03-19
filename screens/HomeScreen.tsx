import { View, Text, StyleSheet, Button, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { RootCompositeParamList } from "../types/type_navigation";
import COLORS from "../constants/colors";
import DetailTransactionTable from "../components/ui/DetailTransactionTable";
import {
  getTotalIncomeAndExpense,
  getTotalBalance,
  getAllTransactions,
} from "../services/transactionService";
import { RootState } from "../stores/store";
import FlatListTransaction from "../components/main/FlatListTransaction";
import ToAddTransactionButton from "../components/ui/ToAddTransactionButton";

type HomeStackNavigationProp = NativeStackNavigationProp<
  RootCompositeParamList,
  "HomeMain"
>;
interface TransactionsListResponse {
  id: number;
  amount: number;
  type: string;
  created_at: string;
  category_name: string;
  color: string;
}
export default function HomeScreen() {
  const navigation = useNavigation<HomeStackNavigationProp>();
  const goToTransactionHandler = () => {
    navigation.navigate("AddTransaction");
  };
  const [totalBalance, setTotalBalance] = useState<string>("0.00");
  const [expenseTotal, setExpenseTotal] = useState<string>("0.00");
  const [incomeTotal, setIncomeTotal] = useState<string>("0.00");
  const [transactionsList, setTransactionsList] = useState<
    TransactionsListResponse[]
  >([]);
  const userId = useSelector((state: RootState) => state.auth.storeUser.id);
  useEffect(() => {
    // set for expenseTotal and incomeTotal
    const getTwoTotal = async () => {
      if (!userId) return;
      const twoTotal = await getTotalIncomeAndExpense(userId);
      if (!twoTotal) return;
      const { totalIncome, totalExpense } = twoTotal;
      setIncomeTotal(totalIncome.toFixed(2).toString());
      setExpenseTotal(totalExpense.toFixed(2).toString());
    };
    getTwoTotal();

    // set for totalBalance
    const getTotalBalanceToDisplay = async () => {
      if (!userId) return;
      const totalBalanceResApi = await getTotalBalance(userId);
      if (!totalBalanceResApi) return;
      setTotalBalance(totalBalanceResApi.toString());
    };
    getTotalBalanceToDisplay();

    // set for Transction List
    const getListTransactions = async () => {
      if (!userId) return;
      const listTransactionsApi = await getAllTransactions(userId);
      if (!Array.isArray(listTransactionsApi)) return;
      setTransactionsList(listTransactionsApi);
    };
    getListTransactions();
  }, [totalBalance, expenseTotal, incomeTotal, transactionsList]);
  return (
    <View style={styles.container}>
      <View style={styles.areaBudget}>
        <View style={styles.areaTotalBudget}>
          <Text style={{ color: COLORS.surface, fontSize: 18 }}>
            Total Balance
          </Text>
          <Text
            style={{ color: COLORS.surface, fontSize: 30, fontWeight: "800" }}
          >
            ${totalBalance}
          </Text>
        </View>

        {/** */}
        <View style={styles.areaDetailTransaction}>
          <DetailTransactionTable
            title="Income"
            transactionTotal={incomeTotal}
          />
          <DetailTransactionTable
            title="Expense"
            transactionTotal={expenseTotal}
          />
        </View>
      </View>
      <View style={styles.areaRecentTransaction}>
        <View style={styles.areaHeaderRecentTransaction}>
          <Text style={{ color: COLORS.text, fontSize: 20, fontWeight: "600" }}>
            Recent Trasactions
          </Text>
          <Pressable
            style={{ padding: 15 }}
            onPress={() =>
              navigation.navigate("Statistics", { screen: "StatisticsMain" })
            }
          >
            <Text
              style={{
                color: COLORS.primary,
                fontSize: 20,
                fontWeight: "400",
              }}
            >
              View all
            </Text>
          </Pressable>
        </View>

        <View style={styles.areaListRecentTransaction}>
          <FlatListTransaction data={transactionsList} />
        </View>
        <ToAddTransactionButton onNavigate={goToTransactionHandler} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  areaBudget: {
    width: "100%",
    backgroundColor: COLORS.primary,
    borderRadius: 18,
    padding: 15,
  },
  areaTotalBudget: {
    width: "100%",
    marginBottom: 10,
  },
  areaDetailTransaction: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  areaRecentTransaction: {
    flex: 1,
  },
  areaHeaderRecentTransaction: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  areaListRecentTransaction: {
    flex: 1,
  },
});
