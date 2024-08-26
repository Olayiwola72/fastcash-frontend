import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createWhitelistFilter } from 'redux-persist-transform-filter';
import userReducer from './user/user.reducer';
import configReducer from './config/config.reducer';

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['user', 'config'],
	transforms: [
		createWhitelistFilter('user', ['token', 'refreshToken', 'userData', 'errorDetails', 'successMessage']),
		createWhitelistFilter('config', ['currencies', 'providers'])
	]
};

// Combine the reducers
export const rootReducer = combineReducers({
    user: userReducer,
    config: configReducer
});

export default persistReducer(persistConfig, rootReducer as any);