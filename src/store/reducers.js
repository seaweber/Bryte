const initialState = {
    brightnessMap: {
        //C3: true
    }
}

function brightnessReducer(state = initialState, action) {
    return {
        ...state,
        [action.indexNote]: action.on
    }
}

export default brightnessReducer;