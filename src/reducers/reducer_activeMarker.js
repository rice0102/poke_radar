export default function(state = null, action){
    
    switch (action.type) {
        case 'CLICK_MARKER':
            return action.payload;
    }

    return state
}