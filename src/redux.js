import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { connectRouter, routerMiddleware } from "connected-react-router";
import history from "./history";
import reducers from "./modules";

const { NODE_ENV } = process.env;
export const isProd = NODE_ENV === "production";

const rootReducer = combineReducers({
  router: connectRouter(history),
  ...reducers
});

let middlewares = [thunk, routerMiddleware(history)];
const enhancer = applyMiddleware(...middlewares);
const devToolsCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnhancers = isProd ? compose : devToolsCompose || compose;

const store = createStore(rootReducer, {}, composeEnhancers(enhancer));

export default store;
