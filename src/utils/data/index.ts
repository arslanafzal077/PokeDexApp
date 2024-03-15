export let categoriesData = [
  { name: "Bug", color: "#90EE90" },
  { name: "Dark", color: "#FFA07A" },
  { name: "Dragon", color: "#AFEEEE" },
  { name: "Electric", color: "#FFD700" },
  { name: "Fairy", color: "#FFC0CB" },
  { name: "Fighting", color: "#FF6347" },
  { name: "Fire", color: "#FFA07A" },
  { name: "Flying", color: "#87CEEB" },
  { name: "Ghost", color: "#8A2BE2" },
  { name: "Grass", color: "#7FFF00" },
  { name: "Ground", color: "#D2B48C" },
  { name: "Ice", color: "#00BFFF" },
  { name: "Normal", color: "#D3D3D3" },
  { name: "Poison", color: "#800080" },
  { name: "Psychic", color: "#FF69B4" },
  { name: "Rock", color: "#A52A2A" },
  { name: "Steel", color: "#4682B4" },
  { name: "Water", color: "#87CEEB" },
];

export let pokemons = [
  {
    name: "Pikachu",
    images: [
      "https://i.pinimg.com/564x/00/3c/06/003c06d5335a39359cc81083c08f1b82.jpg",
      "https://i.pinimg.com/564x/d9/84/4c/d9844c0802fd6601ab55d37916939d41.jpg",
      "https://i.pinimg.com/564x/e1/05/a8/e105a8f003ae01363162753242615d89.jpg",
    ],
    categories: [{ name: "Electric", color: "#FFD700" }],
    description:
      "Pikachu is an Electric-type Pokémon known for its lightning-fast speed and powerful electric attacks.",
  },
  {
    name: "Charmander",
    images: [
      "https://i.pinimg.com/564x/1d/1c/75/1d1c7528d5ea6e4c395810fb37687875.jpg",
      "https://i.pinimg.com/564x/05/64/63/056463010912d6ffaab82c188babf86f.jpg",
    ],
    categories: [{ name: "Fire", color: "#FFA07A" }],
    description:
      "Charmander is a Fire-type Pokémon with a flame at the tip of its tail.",
  },
  {
    name: "Bulbasaur",
    images: [
      "https://purepng.com/public/uploads/large/purepng.com-pokemonpokemonpocket-monsterspokemon-franchisefictional-speciesone-pokemonmany-pokemonone-pikachu-1701527784620nxzpe.png",
      "https://i.pinimg.com/564x/59/f9/bc/59f9bcbe4f8c543d665e503c10062058.jpg",
    ],
    categories: [
      { name: "Grass", color: "#7FFF00" },
      { name: "Poison", color: "#800080" },
    ],
    description:
      "Bulbasaur is a dual-type Grass/Poison Pokémon that has a plant bulb on its back.",
  },
];
