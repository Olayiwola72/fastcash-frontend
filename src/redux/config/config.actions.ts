import { ConfigActionTypes } from './config.types';
import { Config } from './interface';

export const getConfigSuccess = (data : Config) => ({
	type: ConfigActionTypes.GET_CONFIG_SUCCESS,
	payload: data
});