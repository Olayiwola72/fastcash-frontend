import { createSelector } from 'reselect';
import { RootState } from '../store';
import { UserState } from './interface';

// Root selector to get the user state
export const selectUserState = (state: RootState): UserState => state.user;

// Selector to get the userData from user state
export const selectUserData = createSelector(
  [selectUserState],
  (userState: UserState) => userState.userData
);

// Selector to get the token from user state
export const selectToken = createSelector(
  [selectUserState],
  (userState: UserState) => userState.token
);

// Selector to get the errorDetails from user state
export const selectErrorDetailsState = createSelector(
  [selectUserState],
  (userState: UserState) => userState.errorDetails
);

// Selector to get the errorDetails from user state
export const selectIsFetchingState = createSelector(
  [selectUserState],
  (userState: UserState) => userState.isFetching
);

// Selector to get the errorDetails from user state
export const selectSuccessMessage = createSelector(
  [selectUserState],
  (userState: UserState) => userState.successMessage
);

// Selector to get the errorDetails from user state
export const selectShowModal = createSelector(
  [selectUserState],
  (userState: UserState) => userState.showModal
);