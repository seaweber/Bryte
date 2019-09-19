import React from 'react';
import { setDeep } from "./util/deepMerge";

export const Store = React.createContext();

const initialState = {
    activeKeys: ['C3']
}

function reducer( state = initialState, action ) {
    switch ( action.type ) {
        case 'ACTIVATE_KEY':
            const newState =
                setDeep(state, ["activeKeys"], action.note, true);
            return newState;
        case 'DEACTIVATE_KEY':
            const filteredKeys = state.activeKeys
                .filter( key => key === action.note);
             return filteredKeys;
            // const filteredState =
            //     setDeep(state, [`activeKeys.${action.note}`], null, true);
            // return newState;
        default:
            return state;
    }
}

export function StoreProvider( props ) {

    const [state, dispatch] = React.useReducer( reducer, initialState);
    const value = { state, dispatch };

    return <Store.Provider value={value}>
              { props.children }
           </Store.Provider>
}