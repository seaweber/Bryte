import toggleBrightness from './reducers';
import { createStore } from 'redux';

const store = createStore(toggleBrightness);

export default store;