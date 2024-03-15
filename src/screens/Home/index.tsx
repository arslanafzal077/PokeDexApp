import React, { useEffect, useState } from "react";
import { Pressable, Button, StyleSheet, Animated } from "react-native";
import { getPokemons, Pokemon } from "../../utils/api";
import PokemonCard from "../../components/PokemonCard";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import AddPokemonButton from "../../components/AddPokemonButton";

const HomeScreen: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const navigation = useNavigation();
  const fadeAnim = useState(new Animated.Value(0))[0];
  const isFocused = useIsFocused();

  useEffect(() => {
    // Fade in animation when the component mounts
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    const fetchPokemons = async () => {
      try {
        const pokemonData = await getPokemons();
        setPokemons([...pokemonData]); // Create a new array
      } catch (error) {
        console.error("Error fetching pokemons:", error);
      }
    };

    fetchPokemons();
  }, [isFocused]);

  // Function to navigate to AddPokemonScreen
  const navigateToAddPokemon = () => {
    navigation.navigate("AddPokemon");
  };

  return (
    <SafeAreaView style={styles.container}>
      <AddPokemonButton onPress={navigateToAddPokemon} />
      <Animated.FlatList
        data={pokemons}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Pressable onPress={() => navigation.navigate("ViewPokemon", item)}>
            <Animated.View style={{ opacity: fadeAnim }}>
              <PokemonCard
                name={item.name}
                images={item.images}
                categories={item.categories}
                style={styles.pokemonCard}
              />
            </Animated.View>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  pokemonCard: {
    marginBottom: 20,
  },
});

export default HomeScreen;
