// JavaScript source code

import { createStore } from 'redux'; 
import Reducer from './reducers';

 const store = createStore(Reducer);
 window.store = store;
 export default store;