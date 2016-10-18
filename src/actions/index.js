import axios from 'axios';

export const FETCH_POKEMON  = 'FETCH_POKEMON';
export const SET_CENTER     = 'SET_CENTER';
export const POKEMON_SELECTED     = 'POKEMON_SELECTED';

export function fetchPokemon(id,center){
    // zoom change 
    const url = `https://www.pokeradar.io/api/v1/submissions?latitude=${center.lat}&longitude=${center.lng}&zoomLevel=11&pokemonId=${id}`;  
    const request = axios.get(url); 
    return{
        type: FETCH_POKEMON,
        payload: request
    };
}

export function fakeDataEnable (){
   return {
       type: 'FakeDataEnable',
       payload: true
   };
}

export function setCenter (lat,lng){
   return {
       type: SET_CENTER,
       payload: {lat,lng}
   };
}

export function selectPokemon (POKEMON){
   console.log('SELECTED POKEMON: ', POKEMON);
   return {
       type: POKEMON_SELECTED,
       payload: POKEMON
   };
}

export function clickMarker (marker,position){
   return {
       type: 'CLICK_MARKER',
       payload: marker
   };
}