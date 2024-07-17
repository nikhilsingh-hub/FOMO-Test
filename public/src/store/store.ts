import {configureStore } from '@reduxjs/toolkit';
// import { dataReducer } from './reducers';

// const store = configureStore({
//   reducer: {
//     data: dataReducer,
//   },
// });

import cryptoReducer from './cryptoSlice';

const store = configureStore({
  reducer: cryptoReducer
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
