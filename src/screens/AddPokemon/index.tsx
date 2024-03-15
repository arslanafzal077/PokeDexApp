import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  Pressable,
  Animated,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Category, savePokemon } from "../../utils/api";
import CategoriesModal from "../../components/CategoriesModal";

const AddPokemonScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [image, setImage] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState("");

  const handleChooseImage = async () => {
    Alert.alert(
      "Choose Image",
      "Please select an option:",
      [
        {
          text: "Select from Gallery",
          onPress: handleOpenImagePicker,
        },
        {
          text: "Open Camera",
          onPress: handleOpenCamera,
        },
      ],
      { cancelable: true }
    );
  };
  const handleOpenImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleOpenCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera permissions to make this work!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSavePokemon = async () => {
    if (!image) {
      setError("Please choose an image.");
      return;
    }
    if (!name.trim()) {
      setError("Please enter a name.");
      return;
    }
    if (!description.trim()) {
      setError("Please enter a description.");
      return;
    }
    if (categories.length === 0) {
      setError("Please choose at least one category.");
      return;
    }

    try {
      await savePokemon({
        name,
        description,
        categories,
        images: [image],
      });
      navigation.goBack();
    } catch (error) {
      console.error("Error saving pokemon:", error);
    }
  };

  const handleCategorySelection = (selectedCategories: Category[]) => {
    setCategories(selectedCategories);
    setModalVisible(false);
  };

  const showModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          <Image source={{ uri: image }} style={styles.image} />
          <TouchableOpacity
            style={styles.chooseImageButton}
            onPress={handleChooseImage}
          >
            <Text style={styles.chooseImageText}>Choose Image</Text>
          </TouchableOpacity>
          <Text style={styles.label}>Name:</Text>
          <TextInput style={styles.input} value={name} onChangeText={setName} />
          <Text style={styles.label}>Description:</Text>
          <TextInput
            style={[styles.input, { height: 100 }]}
            value={description}
            onChangeText={setDescription}
            multiline
          />
          <View style={styles.categoryContainer}>
            <Text style={styles.label}>Categories:</Text>
            <View style={styles.categoryList}>
              {categories.map((category, index) => (
                <View
                  key={index}
                  style={[
                    styles.categoryItem,
                    { backgroundColor: category.color },
                  ]}
                >
                  <Text style={styles.categoryText}>{category.name}</Text>
                </View>
              ))}
            </View>
          </View>
          <Pressable style={styles.categoryButton} onPress={showModal}>
            <Text style={styles.categoryButtonText}>Choose Categories</Text>
          </Pressable>
          <Button title="Save" onPress={handleSavePokemon} />
          {error ? <Text style={styles.error}>{error}</Text> : null}
          {modalVisible && (
            <CategoriesModal
              selectedCategories={categories}
              onSave={handleCategorySelection}
              onClose={closeModal}
            />
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  chooseImageButton: {
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#007bff",
  },
  chooseImageText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    alignSelf: "flex-start",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    width: "100%",
  },
  categoryButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#007bff",
    marginBottom: 20,
  },
  categoryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  categoryContainer: {
    marginBottom: 20,
    width: "100%",
  },
  categoryList: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  categoryItem: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 10,
    marginBottom: 10,
  },
  categoryText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
});

export default AddPokemonScreen;
