import { CHANGE_THEME, TEST_METHOD } from "../types/types";

const testMethod = (value) => {
  return {
    type: TEST_METHOD,
    payload: value
  };
};

export const changeTheme = (value) => {
  return {
    type: CHANGE_THEME,
    payload: value
  }
}

export {testMethod};
