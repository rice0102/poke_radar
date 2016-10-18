import React, { Component } from 'react';
import PokemonMap from './pokemon_map';
import PokemonSelect from './pokemon_select';


export default class App extends Component {
  render() {
    return (
      <div>
        <PokemonSelect />
        <h2 className="col-md-8">Pokemon Map</h2>
        <PokemonMap />
      </div>
    );
  }
}

