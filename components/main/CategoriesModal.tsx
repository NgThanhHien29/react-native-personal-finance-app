import { Modal, View, Text, StyleSheet, Pressable } from "react-native";

import COLORS from "../../constants/colors";
import Feather from "@expo/vector-icons/Feather";
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
interface CategoriesModalProps {
  visible: boolean;
  turnoff: () => void;
  category: TypeCategories;
  onGetCategory: (item: TypeCategories) => void;
}

function CategoriesModal({
  visible,
  turnoff,
  category,
  onGetCategory,
}: CategoriesModalProps) {
  const arrCategory: TypeCategories[] = [
    { key: "food", label: "Ăn uống" },
    { key: "entertainment", label: "Giải trí" },
    { key: "other", label: "Khác" },
    { key: "shopping", label: "Mua sắm" },
    { key: "health", label: "Sức khỏe" },
    { key: "transport", label: "Xăng xe" },
  ];
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.headerTitle}>Select Category</Text>
            <Pressable style={styles.modalExit} onPress={turnoff}>
              <Feather name="x-circle" size={26} color="black" />
            </Pressable>
          </View>
          {arrCategory.map((item) => {
            return (
              <Pressable
                key={item.key}
                style={styles.categoryItem}
                onPress={() => onGetCategory(item)}
              >
                <View
                  style={[styles.dot, { backgroundColor: COLORS[item.key] }]}
                ></View>
                <Text style={styles.categoryItemText}>{item.label}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    </Modal>
  );
}

export default CategoriesModal;
const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: COLORS.overlay,
  },
  modalContainer: {
    width: "100%",
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden",
    paddingBottom: 10,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.textLighter,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 500,
    color: COLORS.text,
  },
  modalExit: {
    padding: 5,
  },
  categoryItem: {
    flexDirection: "row",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.textLighter,
  },
  categoryItemText: {
    fontSize: 16,
    fontWeight: "400",
  },
  dot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "red",
    marginRight: 10,
  },
});
