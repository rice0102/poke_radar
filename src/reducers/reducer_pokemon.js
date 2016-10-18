import { FETCH_POKEMON } from '../actions/index';

export default function (state = null, action){
    switch (action.type) {

        case FETCH_POKEMON:
            return { ...state, pokemon: action.payload.data };
    }
    return state;
}