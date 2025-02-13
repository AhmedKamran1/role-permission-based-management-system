import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { getUser } from './userActions';

const initialState = {
  id: null,
  name: null,
  email: null,
  role: null,
  subRole: null,
  permissions: null,
  status: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: () => initialState,
    login: (state, action) => (state = action.payload),
    updateDetails: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(HYDRATE, (state, action) => {
        return { ...state, ...action };
      })
      .addCase(getUser.rejected, (state, action) => {
        return initialState;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        return action.payload;
      });
  },
});

export const selectUserState = (state) => state.user;

export const userActions = userSlice.actions;
export default userSlice;
