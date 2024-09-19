import { createSlice } from '@reduxjs/toolkit';
import { saveStateToLocalStorage, loadStateFromLocalStorage } from '../utils/localStorageUtils';

const initialState = loadStateFromLocalStorage();

const groupingOrderingSlice = createSlice({
  name: 'groupingOrdering',
  initialState,
  reducers: {
    setGrouping: (state, action) => {
      state.grouping = action.payload;
      if (action.payload === 'Priority') {
        state.ordering = 'Title'; 
      }
      saveStateToLocalStorage(state); // Save to localStorage on state change
    },
    setOrdering: (state, action) => {
      state.ordering = action.payload;
      saveStateToLocalStorage(state); // Save to localStorage on state change
    },
  },
});

export const { setGrouping, setOrdering } = groupingOrderingSlice.actions;

export default groupingOrderingSlice.reducer;
