import axios, { AxiosResponse } from 'axios';
import { Dispatch } from 'redux';
import { PokemonListItem } from '../interfaces/interfaces';
import {
  FILTER_POKEMONS,
  LOADED_POKEMONS,
} from '../constants/pokemonConstants';
import API from '../services/api-service';

export const loadData = () => (dispatch: Dispatch) => {
  API.get('pokemon').then((responseList: AxiosResponse) => {
    const pokemonItemList: PokemonListItem[] = responseList.data.results;
    Promise.all(
      pokemonItemList.map((item: PokemonListItem) => axios.get(item.url)),
    ).then(
      (results) => {
        const pokemonListByName: any = {};
        const pokemonList = results.map((response: AxiosResponse) => {
          pokemonListByName[response.data.name] = response.data;
          return response.data;
        });
        dispatch({ type: LOADED_POKEMONS, pokemonList, pokemonListByName });
      },
      () => {},
    );
  });
};

export const filterPokemonListByName = (searchValue: string) => (
  dispatch: Dispatch,
  getState: Function,
) => {
  const { pokemonList } = getState().pokemonReducer;
  dispatch({
    type: FILTER_POKEMONS,
    searchValue,
    filteredPokemonList: pokemonList.filter(
      (pokemon: any) => pokemon.name.indexOf(searchValue.toLowerCase()) !== -1,
    ),
  });
};
