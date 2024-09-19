import { configureStore } from '@reduxjs/toolkit';
import groupingOrderingReducer from './groupingOrderingSlice'; 

export const store = configureStore({
  reducer: {
    groupingOrdering: groupingOrderingReducer, 
  },
});



