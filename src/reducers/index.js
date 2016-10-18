import { combineReducers } from 'redux';
import PokemonReducer from './reducer_pokemon';
import PokemonListReducer from './reducer_pokemon_list';
import ActiveMarkerReducer from './reducer_activeMarker';
import CenterReducer from './reducer_center';
import SelectedReducer from './reducer_selectedPokemon';
import FakeDataReducer from './reducer_fakeData';

const rootReducer = combineReducers({
 pokemon: PokemonReducer,
 pokemonList: PokemonListReducer,
 marker: ActiveMarkerReducer,
 center: CenterReducer,
 selected: SelectedReducer,
 fakeData: FakeDataReducer
});

export default rootReducer;
