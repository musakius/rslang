import { combineReducers } from "redux";
import { CHANGE_THEME, TEST_METHOD } from "../types/types";

const initialState = {
  testData: {}
};

const initialThemeState = {
  value: 'info'
};

const testReducer = (state = initialState, action) => {
  switch (action.type) {
    case TEST_METHOD:
      return {...state, testData: action.payload};
    default:
      return state;
  }
};

const themeReducer = (state = initialThemeState, action) => {
  switch (action.type) {
    case CHANGE_THEME:
      return {...state, value: action.payload}
    default: return state;
  }
}

const reducer = combineReducers({
  testReducer,
  theme: themeReducer
})

export default reducer;
