import {combineReducers} from 'redux';
import {
  CHANGE_THEME,
  SHOW_BUTTONS,
  SHOW_TRANSLATE,
  TEST_METHOD,
  USER_INFO,
  GAME_INFO,
  CHANGE_TEXTBOOK_GROUP,
  DELETE_GAME_INFO
} from '../types/types';

const initialState = {
  testData: {}
};

const initialThemeState = {
  value: 'info'
};

const initialSettingsState = {
  showButtons: true,
  showTranslate: true
};

const initialUserState = {
  user: []
};

const initialGameState = {};

const initialTextbookGroupState = {
  value: null
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
      return {...state, value: action.payload};
    default:
      return state;
  }
};

const settingsReducer = (state = initialSettingsState, action) => {
  switch (action.type) {
    case SHOW_BUTTONS:
      return {...state, showButtons: action.payload};
    case SHOW_TRANSLATE:
      return {...state, showTranslate: action.payload};
    default:
      return state;
  }
};

const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case USER_INFO:
      return {...state, user: action.payload};
    default:
      return state;
  }
};

const gameInfoReducer = (state = initialGameState, action) => {
  switch (action.type) {
    case GAME_INFO:
      return Object.assign({}, state, {
        pageNum: action.pageNum,
        groupNum: action.groupNum,
        page: action.page,
        filter: action.filter
      });
    case DELETE_GAME_INFO:
      return {};
    default:
      return state;
  }
};

const textbookGroupReducer = (state = initialTextbookGroupState, action) => {
  switch (action.type) {
    case CHANGE_TEXTBOOK_GROUP:
      return {...state, value: action.payload};
    default:
      return state;
  }
};

const reducer = combineReducers({
  testReducer,
  theme: themeReducer,
  settings: settingsReducer,
  user: userReducer,
  gameInfo: gameInfoReducer,
  textbookGroup: textbookGroupReducer
});

export default reducer;
