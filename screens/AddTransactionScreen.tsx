import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet, Text, TextInput, Pressable } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useLayoutEffect, useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootMainStackParamList } from "../types/type_navigation";
import HeaderTitle from "../components/ui/HeaderTitle";
import TypeTransactionButton from "../components/main/TypeTransactionButton";
import TransactionInput from "../components/main/TransactionInput";
import COLORS from "../constants/colors";
import CategoriesModal from "../components/main/CategoriesModal";
import TransactionButton from "../components/main/TransactionButton";
import { AppDispatch, RootState } from "../stores/store";
import { setCategory as setCategoryApi } from "../services/categoryService";
import { setTransaction as setTransactionApi } from "../services/transactionService";
import { setCategory as setCategorySlice } from "../stores/slices/categorySlice";
import { setTransaction as setTransactionSlice } from "../stores/slices/transactionSlice";

type AddTransactionStackNavigationProp = NativeStackNavigationProp<
  RootMainStackParamList,
  "AddTransaction"
>;
type TypeTransaction = "expense" | "income";

type TypeCategoriesLabel =
  | "Ăn uống"
  | "Giải trí"
  | "Khác"
  | "Mua sắm"
  | "Sức khỏe"
  | "Xăng xe";
type TypeCategoriesKey =
  | "food"
  | "entertainment"
  | "other"
  | "shopping"
  | "health"
  | "transport";
interface TypeCategories {
  key: TypeCategoriesKey;
  label: TypeCategoriesLabel;
}

export default function AddTransactionScreen() {
  const navigation = useNavigation<AddTransactionStackNavigationProp>();
  const dispatch = useDispatch<AppDispatch>();
  // typeTransaction la du lieu cho type sql
  const [typeTransaction, setTypeTransaction] =
    useState<TypeTransaction>("expense");
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => {
        return <HeaderTitle>Add Transaction</HeaderTitle>;
      },
      headerBackTitle: "Back",
    });
  }, [navigation]);
  useCallback(() => {}, [typeTransaction]);

  // Amount
  const [amount, setAmount] = useState<string>("");

  // Categories
  const [categoriesIsVisible, setCategoriesIsVisible] =
    useState<boolean>(false);
  const [category, setCategory] = useState<TypeCategories>({
    key: "food",
    label: "Ăn uống",
  });
  const turnoffCategoriesModal = () => {
    setCategoriesIsVisible(false);
  };

  // Date
  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];
  const [date, setDate] = useState<string>(formattedDate);

  // Description
  const [description, setDescription] = useState<string>("");
  useEffect(() => {
    console.log("TypeTransaction changed:", typeTransaction);
    console.log("Amount:", amount);
    console.log("Category:", category);
    console.log("Date:", date);
    console.log("Description:", description);
  }, [typeTransaction, category]);

  const userId = useSelector((state: RootState) => state.auth.storeUser.id); //userId co kieu number| null
  const setCategoryHandler = async () => {
    const name = category.label;
    const color = COLORS[category.key];
    if (!userId) return;
    try {
      const res = await setCategoryApi({ userId, name, color });
      dispatch(
        setCategorySlice({
          id: res.id,
          userId: res.userId,
          name: res.name,
          color: res.color,
        }),
      );
    } catch (error: any) {
      console.log("ERROR:", error.response?.data);
      console.log("STATUS:", error.response?.status);
    }
  };
  // Ham gui du lieu len table transactions MySql
  const submitHandler = async () => {
    console.log("Gui du lieu len SQL");
    if (!userId) return;
    const amountNumber = parseFloat(amount);
    if (isNaN(amountNumber)) {
      console.log("Amount không hợp lệ");
      return;
    }
    const type = typeTransaction;
    try {
      const categoryRes = await setCategoryApi({
        userId,
        name: category.label,
        color: COLORS[category.key],
      });

      const categoryId = categoryRes.id;
      const res = await setTransactionApi({
        userId,
        categoryId,
        amount: amountNumber,
        description: description || "No decription",
        date,
        type,
      });

      dispatch(setTransactionSlice(res));
    } catch (error: any) {
      console.log("ERROR:", error.response?.data);
      console.log("STATUS:", error.response?.status);
    }

    navigation.goBack();
  };
  const cancelHandler = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      {/** Type */}
      <View style={styles.typeTransactionArea}>
        <TypeTransactionButton
          valueType="expense"
          onChosenType={setTypeTransaction}
          colorType={typeTransaction}
        >
          Expense
        </TypeTransactionButton>
        <TypeTransactionButton
          valueType="income"
          onChosenType={setTypeTransaction}
          colorType={typeTransaction}
        >
          Income
        </TypeTransactionButton>
      </View>

      {/** Amount */}
      <TransactionInput title="Amount">
        <TextInput
          placeholder="0.00"
          placeholderTextColor={COLORS.textLighter}
          value={amount}
          onChangeText={setAmount}
        />
      </TransactionInput>

      {/** Category */}
      <TransactionInput title="Category">
        <Pressable
          onPress={() => setCategoriesIsVisible(true)}
          style={styles.category}
        >
          <View
            style={[styles.dot, { backgroundColor: COLORS[category.key] }]}
          ></View>
          <Text style={{ fontSize: 16, fontWeight: "400" }}>
            {category.label}
          </Text>
        </Pressable>
        <CategoriesModal
          visible={categoriesIsVisible}
          turnoff={turnoffCategoriesModal}
          category={category}
          onGetCategory={setCategory}
        />
      </TransactionInput>

      {/** Date */}
      <TransactionInput title="Date">
        <Text style={{ color: COLORS.text }}>{date}</Text>
      </TransactionInput>

      {/** Description */}
      <TransactionInput title="Description">
        <TextInput
          placeholder="Add note..."
          value={description}
          onChangeText={setDescription}
          style={styles.descriptionText}
          multiline={true}
        />
      </TransactionInput>
      {/** Transaction Button */}
      <TransactionButton onPress={submitHandler} type="submit">
        Add Transaction
      </TransactionButton>
      <TransactionButton onPress={cancelHandler} type="cancel">
        Cancel
      </TransactionButton>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  typeTransactionArea: {
    paddingHorizontal: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  category: {
    flexDirection: "row",
  },
  dot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "red",
    marginRight: 10,
  },
  descriptionText: {
    height: 50,
    color: COLORS.text,
    textAlignVertical: "top",
  },
});
