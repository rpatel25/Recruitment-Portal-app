import {
  configureStore,
  createImmutableStateInvariantMiddleware,
} from "@reduxjs/toolkit";
import userReducer from "./slice/useSlice";
import filterReducer from "./slice/filterSlice";
import { ApiRequest } from "./services/ApiRequest";

const immutableInvariantMiddleware = createImmutableStateInvariantMiddleware();

export const store = configureStore({
  reducer: {
    userSlice: userReducer,
    filterSlice: filterReducer,
    [ApiRequest.reducerPath]: ApiRequest.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: true,
      immutableCheck: true,
    }).concat([ApiRequest.middleware, immutableInvariantMiddleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
