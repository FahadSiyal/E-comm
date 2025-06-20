import { createSlice } from '@reduxjs/toolkit';
import { setToLocalStorage } from '../../utils/localStorageUtils';

const initialState = {
  // step1: {},
  // step2: {},
  // step3: {},
  // ... other steps
};

const sellerRegistrationSlice = createSlice({
  name: 'sellerRegistration',
  initialState,
  reducers: {
    saveStepData: (state, action) => {
      const { step, data } = action.payload;
      state[step] = data;
       setToLocalStorage('sellerRegistration', JSON.stringify(state));
    },
    resetRegistration: () => initialState,
  },
});

export const { saveStepData, resetRegistration } = sellerRegistrationSlice.actions;
export default sellerRegistrationSlice.reducer;