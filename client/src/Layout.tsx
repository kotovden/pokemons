import React, {useEffect} from 'react';
import PokemonList from './components/PokemonList/PokemonList'
import {filterPokemonListByName, loadData} from './actions/PokemonActions';
import {
    Switch,
    Redirect,
    Route,
    withRouter
} from "react-router-dom";
import PokemonCard from "./components/PokemonCard/PokemonCard";
import {connect} from "react-redux";
import AbilityCard from "./components/AbilityCard/AbilityCard";

const Layout = (props:any) => {
    useEffect(() => {
        props.loadData();
    }, [true]);
    const pokemonListByName = props;
    return (
        <div>
            <Switch>
                <Route exact path="/">
                    <PokemonList />
                </Route>
                <Route path="/pokemon/:name">
                    <PokemonCard pokemonListByName={pokemonListByName} />
                </Route>
                <Route path="/ability/:name">
                    <AbilityCard pokemonListByName={pokemonListByName} />
                </Route>
            </Switch>
        </div>

    )
};
const mapStateToProps = (state:any) => {
    return (({
        pokemonListByName: state.pokemonReducer.pokemonListByName,
    }))
};
const mapDispatchToProps = {
    loadData,
    filterPokemonListByName
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Layout));