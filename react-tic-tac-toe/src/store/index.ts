import {createStore, applyMiddleware} from '@reduxjs/toolkit';
import thunkMiddleware, {ThunkMiddleware} from 'redux-thunk';
import rootReducer from './reducer';

const middleware = [thunkMiddleware as ThunkMiddleware];

export default createStore(rootReducer, applyMiddleware(...middleware));
