import { defineStore } from 'pinia';

export const usePokemonStore = defineStore({
  id: 'pokemon',
  state: () => ({
    pokemons: [],
    
  }),
  actions: {
    setPokemons(pokemons) {
      this.pokemons = pokemons;
    },
    setPokemonDetail(pokemonDetail) {
      this.pokemonDetail = pokemonDetail;
    },
  },
});