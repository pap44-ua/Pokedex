import { defineStore } from 'pinia';

export const usePokemonStore = defineStore({
  id: 'pokemon',
  state: () => ({
    pokemons: [],
    pokemonDetail: null,
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