import {
  CHANGE_THEME,
  SHOW_BUTTONS,
  SHOW_TRANSLATE,
  TEST_METHOD,
  USER_INFO,
  GAME_INFO,
} from "../types/types";

const testMethod = (value) => {
  return {
    type: TEST_METHOD,
    payload: value,
  };
};

export const changeTheme = (value) => {
  return {
    type: CHANGE_THEME,
    payload: value,
  };
};

export const showButtons = (value) => {
  return {
    type: SHOW_BUTTONS,
    payload: value,
  };
};

export const showTranslate = (value) => {
  return {
    type: SHOW_TRANSLATE,
    payload: value,
  };
};

export const setUserInfo = (value) => {
  return {
    type: USER_INFO,
    payload: value,
  };
};

export const setGameInfo = (pageNum, groupNum, page, filter) => {
  return {
    type: GAME_INFO,
    pageNum,
    groupNum,
    page,
    filter,
  };
};

export { testMethod };
