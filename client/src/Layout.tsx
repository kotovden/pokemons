import React, {useEffect, useState} from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { filterPokemonListByName, loadData } from './actions/PokemonActions';
import AbilityCard from './components/AbilityCard/AbilityCard';
import PokemonList from './components/PokemonList/PokemonList';
import PokemonCard from './components/PokemonCard/PokemonCard';

const Layout = (props:any) => {
  const [loaded, setLoaded] = useState(false);
  const { loadData } = props;
  useEffect(() => {
    loadData();
    setLoaded(true);
  }, [loaded, loadData]);
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
          <AbilityCard />
        </Route>
      </Switch>
    </div>
  );
};
// @ts-ignore
const mapStateToProps = (state: any) => ({
  pokemonListByName: state.pokemonReducer.pokemonListByName,
});
const mapDispatchToProps = {
  loadData,
  filterPokemonListByName,
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Layout));
