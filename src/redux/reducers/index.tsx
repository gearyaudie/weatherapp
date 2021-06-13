import { combineReducers } from "redux";
import weatherReducer from "./weather";

export const rootReducer = combineReducers({
  weather: weatherReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
