// components/PokemonCard.tsx
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

interface category {
  name: string;
  color: string;
}

interface PokemonCardProps {
  name: string;
  images: string[];
  categories: category[];
}

const PokemonCard: React.FC<PokemonCardProps> = ({
  name,
  images,
  categories,
}) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: images[0] }} style={styles.image} />
      <Text style={styles.name}>{name}</Text>
      <View style={styles.categoriesContainer}>
        {categories.map((category, index) => (
          <Text
            key={index}
            style={[styles.category, { backgroundColor: category.color }]}
          >
            {category.name}
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    margin: 8,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 8,
    borderRadius: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  categoriesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  category: {
    marginRight: 4,
    marginBottom: 4,
    padding: 4,
    backgroundColor: "#f0f0f0",
    borderRadius: 4,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default PokemonCard;
