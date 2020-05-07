import pokemonReducer from './pokemonReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  pokemonReducer,
});

export default rootReducer;
