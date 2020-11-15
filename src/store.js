import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import ticketReducer from './Reducers/ticketReducer';
import initialData from './Data/initialData';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

const initialState = initialData;
const middleware = [thunk];


const store = createStore(
	ticketReducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
