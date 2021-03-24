const initialState = {
  testData: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TEST_METHOD':
      return {...state, testData: action.payload};
    default:
      return state;
  }
};

export default reducer;
