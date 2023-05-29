import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CounterState = {
  value: string;
};

const initialState = {
  value: '',
} as CounterState;

export const cemetery = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setCemeteryUuid: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setCemeteryUuid } = cemetery.actions;
export default cemetery.reducer;
