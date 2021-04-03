import { combineReducers } from 'redux';
import {
  CHANGE_THEME,
  SHOW_BUTTONS,
  SHOW_TRANSLATE,
  TEST_METHOD,
  USER_INFO,
  USER_PAGE,
} from '../types/types';

const initialState = {
  testData: {},
};

const initialThemeState = {
  value: 'info',
};

const initialSettingsState = {
  settings: {
    showButtons: true,
    showTranslate: true,
  },
};

const initialUserState = {
  user: [],
};

const inintialPageState = {
  userPage: '',
};

const testReducer = (state = initialState, action) => {
  switch (action.type) {
    case TEST_METHOD:
      return { ...state, testData: action.payload };
    default:
      return state;
  }
};

const themeReducer = (state = initialThemeState, action) => {
  switch (action.type) {
    case CHANGE_THEME:
      return { ...state, value: action.payload };
    default:
      return state;
  }
};

const settingsReducer = (state = initialSettingsState, action) => {
  switch (action.type) {
    case SHOW_BUTTONS:
      return { ...state, showButtons: action.payload };
    case SHOW_TRANSLATE:
      return { ...state, showTranslate: action.payload };
    default:
      return state;
  }
};

const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case USER_INFO:
      return { ...state, user: state.user.concat(action.payload) };
    default:
      return state;
  }
};

const userPageReducer = (state = inintialPageState, action) => {
  switch (action.type) {
    case USER_PAGE:
      return { ...state, userPage: action.payload };
    default:
      return state;
  }
};

const reducer = combineReducers({
  testReducer,
  theme: themeReducer,
  settings: settingsReducer,
  user: userReducer,
  userPage: userPageReducer,
});

export default reducer;
