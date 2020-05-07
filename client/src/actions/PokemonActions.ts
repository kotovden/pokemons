import API from "../services/api-service";
import {AxiosResponse} from "axios";
import axios from "axios";
import {Dispatch} from "redux";
import {PokemonListItem} from "../interfaces/interfaces";
import {FILTER_POKEMONS, LOADED_POKEMONS} from "../constants/pokemonConstants";

export const loadData = () => (dispatch:Dispatch) => {
    API.get('pokemon').then((response:AxiosResponse) => {
        console.log(response.data);
        const pokemonList:PokemonListItem[] = response.data.results;
        Promise.all(
            pokemonList.map((item:PokemonListItem) =>  axios.get(item.url))
        ).then(
            results => {
                let pokemonListByName:any = {};
                const pokemonList = results.map((response:AxiosResponse) => {
                    pokemonListByName[response.data.name] = response.data;
                    return response.data
                });
                dispatch({type: LOADED_POKEMONS, pokemonList, pokemonListByName })
            },
            error => {}
        )
    });
}

export const filterPokemonListByName = (searchValue:string) => (dispatch:Dispatch, getState:Function) => {
    const {pokemonList} = getState().pokemonReducer;
    dispatch({type: FILTER_POKEMONS, searchValue, filteredPokemonList: pokemonList.filter((pokemon:any) => pokemon.name.indexOf(searchValue.toLowerCase()) !== -1 )})
}