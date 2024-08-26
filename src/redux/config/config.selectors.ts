import { createSelector } from 'reselect';
import { RootState } from '../store';
import { ConfigState } from './interface';

// Root selector to get the config state
export const selectConfigState = (state: RootState): ConfigState => state.config;

// Selector to get the currencies from config state
export const selectConfigCurrencies = createSelector(
  [selectConfigState],
  (configState: ConfigState) => configState.currencies
);