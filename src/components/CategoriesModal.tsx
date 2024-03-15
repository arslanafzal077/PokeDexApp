import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { categoriesData } from "../utils/data";
import { Category } from "../utils/api";

interface CategoryModalProps {
  selectedCategories: Category[];
  onSave: (selectedCategories: string[]) => void;
  onClose: () => void;
}

const CategoriesModal: React.FC<CategoryModalProps> = ({
  selectedCategories,
  onSave,
  onClose,
}) => {
  const [selected, setSelected] = useState<Category[]>(selectedCategories);

  const handleCategoryPress = (category: Category) => {
    const index = selected.findIndex((c) => c.name === category.name);
    if (index !== -1) {
      // Category is already selected, unselect it
      const updatedCategories = selected.filter(
        (c) => c.name !== category.name
      );
      setSelected(updatedCategories);
    } else {
      if (selected.length < 2) {
        // Less than two categories selected, add the new category
        setSelected([...selected, category]);
      } else {
        // Two categories already selected, replace the last one with the new category
        const updatedCategories = [...selected];
        updatedCategories.splice(-1, 1, category); // Replace the last selected category
        setSelected(updatedCategories);
      }
    }
  };

  const isCategorySelected = (category: Category) =>
    selected.some((c) => c.name === category.name);

  return (
    <Modal animationType="slide" transparent={true} visible={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Select 1 or 2 Categories</Text>
          <FlatList
            data={categoriesData}
            numColumns={3}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.categoryItem,
                  {
                    width: `${88 / 3}%`, // Dynamically set the width based on the number of columns
                    backgroundColor: isCategorySelected(item)
                      ? item.color
                      : "#fff",
                  },
                ]}
                onPress={() => handleCategoryPress(item)}
              >
                <Text style={styles.categoryText}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
          <View style={styles.row}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.selectButton}
              onPress={() => onSave(selected)}
            >
              <Text style={styles.closeButtonText}>Select</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    width: "88%",
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  categoryItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginBottom: 10,
    marginRight: 10,
    alignItems: "center",
    width: "30%",
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  closeButton: {
    backgroundColor: "#FF0000",
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: "center",
    width: "45%",
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  selectButton: {
    backgroundColor: "green",
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: "center",
    width: "45%",
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default CategoriesModal;
