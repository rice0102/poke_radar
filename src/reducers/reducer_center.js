import { SET_CENTER } from '../actions/index';

export default function (state =null, action){
    switch (action.type) {
        case SET_CENTER:      
         return  action.payload;
    }
    return state;
}