import React from "react";
import { View, Text, Image, StyleSheet, Animated } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { Pokemon, Category } from "../../utils/api";

type RootStackParamList = {
  ViewPokemon: Pokemon;
};

type ViewPokemonScreenRouteProp = RouteProp<RootStackParamList, "ViewPokemon">;

const ViewPokemonScreen: React.FC<{ route: ViewPokemonScreenRouteProp }> = ({
  route,
}) => {
  const { name, images, categories, description } = route.params;

  // Define animated values for animations
  const fadeAnim = new Animated.Value(0);
  const imageAnim = new Animated.Value(0);

  // Function to animate screen elements
  const animateScreen = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(imageAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // Animate screen on component mount
  React.useEffect(() => {
    animateScreen();
  }, []);

  // Animated styles for images
  const imageScale = imageAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 1],
  });
  const imageOpacity = imageAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0.5, 1],
  });

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Text style={styles.title}>Name: {name}</Text>
      <Text style={styles.text}>Description: {description}</Text>
      <View style={styles.categoryContainer}>
        <Text style={styles.label}>Categories:</Text>
        <View style={styles.categoryList}>
          {categories.map((category, index) => (
            <View
              key={index}
              style={[styles.categoryItem, { backgroundColor: category.color }]}
            >
              <Text style={styles.categoryText}>{category.name}</Text>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.imageContainer}>
        {images.map((image, index) => (
          <Animated.Image
            key={index}
            source={{ uri: image }}
            style={[
              styles.image,
              { transform: [{ scale: imageScale }], opacity: imageOpacity },
            ]}
          />
        ))}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  categoryContainer: {
    marginTop: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  categoryList: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  categoryItem: {
    padding: 5,
    borderRadius: 5,
    marginRight: 5,
    marginBottom: 5,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  image: {
    width: 100,
    height: 100,
    marginHorizontal: 5,
  },
});

export default ViewPokemonScreen;
