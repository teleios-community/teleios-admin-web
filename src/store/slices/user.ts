import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { removeSessionDetails, removeTokenDetails, storeSessionDetails, storeTokenDetails } from 'functions/userSession';
import { TokenType, UserType } from '../../types/user';

// Define a type for the slice state

// Define the initial state using that type
const initialState: { user: UserType | null; token: TokenType | null } = {
  user: null,
  token: null,
};

// Actual Slice
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser(state, action: PayloadAction<{ user: UserType }>) {
      state.user = action.payload.user;
      storeSessionDetails(action.payload.user);
    },
    updateToken(state, action: PayloadAction<{ token: TokenType }>) {
      state.token = action.payload.token;
      storeTokenDetails(action.payload.token);
    },
    signOut(state) {
      state.user = null;
      state.token = null;
      removeSessionDetails();
      removeTokenDetails();
    },
  },
});

export const { updateUser, signOut, updateToken } = userSlice.actions;

export default userSlice.reducer;
