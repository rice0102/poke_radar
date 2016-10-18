import { POKEMON_SELECTED } from '../actions/index';

export default function(state = 0, action){
    
    switch (action.type) {
        case POKEMON_SELECTED:
            return action.payload;
    }

    return state
}