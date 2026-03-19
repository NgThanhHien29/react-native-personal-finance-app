import { FlatList, Text } from "react-native";

import TransactionItem from "../ui/TransactionItem";

interface TypeList {
  id: number;
  amount: number;
  type: string;
  created_at: string;
  category_name: string;
  color: string;
}
interface FlatListTransactionProps {
  data?: TypeList[] | null;
}
function FlatListTransaction({ data }: FlatListTransactionProps) {
  if (!data) return <Text>No Transactions</Text>;
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <TransactionItem {...item} />}
      keyExtractor={(item) => item.id.toString()}
    />
  );
}

export default FlatListTransaction;
