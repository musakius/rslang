import reducer from "../reducers";
import { compose, createStore } from "redux";

const store = createStore(
  reducer,
  compose(
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
