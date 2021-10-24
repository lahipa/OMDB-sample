import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const logger = (store: any) => (next: any) => (action: any) => {
  console.group(action.type);
  console.info("[Middleware] Dispatching", action);

  const result = next(action);

  console.log("[Middleware] Next State", store.getState());
  console.groupEnd();

  return result;
};

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,

  //switch if development env or production (else)
  process.env.NEXT_PUBLIC_ENV === "development"
    ? compose(applyMiddleware(logger, thunk))
    : compose(applyMiddleware(thunk))
);

export default store;
