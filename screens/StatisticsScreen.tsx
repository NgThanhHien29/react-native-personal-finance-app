import { View, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../stores/store";
import { getAllTransactions } from "../services/transactionService";
import FlatListTransaction from "../components/main/FlatListTransaction";
import COLORS from "../constants/colors";

interface TransactionsListResponse {
  id: number;
  amount: number;
  type: string;
  created_at: string;
  category_name: string;
  color: string;
}
export default function StatisticsScreen() {
  const [transactionsList, setTransactionsList] = useState<
    TransactionsListResponse[]
  >([]);
  const userId = useSelector((state: RootState) => state.auth.storeUser.id);
  useEffect(() => {
    // set for Transction List
    const getListTransactions = async () => {
      if (!userId) return;
      const listTransactionsApi = await getAllTransactions(userId);
      if (!Array.isArray(listTransactionsApi)) return;
      setTransactionsList(listTransactionsApi);
    };
    getListTransactions();
  }, [transactionsList]);
  return (
    <View style={styles.container}>
      <FlatListTransaction data={transactionsList} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 10,
    alignItems: "center",
    backgroundColor: COLORS.background,
  },
});
