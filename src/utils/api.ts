import { pokemons, categoriesData } from "./data";

export interface Pokemon {
  name: string;
  images: string[];
  categories: Category[];
  description: string;
}
export interface Category {
  name: string;
  color: string;
}

// Temporary array to store new Pokémon
let newPokemons: Pokemon[] = [];

export async function getPokemons(): Promise<Pokemon[]> {
  // Return the original pokemons array plus the newPokemons array
  return [...pokemons, ...newPokemons];
}

export async function getCategories(): Promise<Category[]> {
  return categoriesData;
}

export async function savePokemon(newPokemon: Pokemon): Promise<void> {
  // Push the new Pokemon to the newPokemons array
  newPokemons.push(newPokemon);
  console.log("Pokemon saved successfully:", newPokemon);
}
