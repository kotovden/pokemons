import {
  LOADED_POKEMONS,
  FILTER_POKEMONS,
} from '../constants/pokemonConstants';

const initialState = {
  pokemonList: [],
  filteredPokemonList: [],
  searchValue: '',
};

const pokemonReducer = (state: any = initialState, action: any) => {
  switch (action.type) {
    case LOADED_POKEMONS: {
      return {
        ...state,
        pokemonList: action.pokemonList,
        filteredPokemonList: action.pokemonList,
        pokemonListByName: action.pokemonListByName,
      };
    }
    case FILTER_POKEMONS: {
      return {
        ...state,
        filteredPokemonList: action.filteredPokemonList,
        searchValue: action.searchValue,
      };
    }
    default: {
      return state;
    }
  }
};
export default pokemonReducer;
