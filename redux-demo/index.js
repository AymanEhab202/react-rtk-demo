const redux = require("redux");
const createStore = redux.createStore;
const bindActionsCreators = redux.bindActionCreators;
const combineReducers = redux.combineReducers;
const produce = require("immer").produce;
const applyMiddleware = redux.applyMiddleware;

const reduxLogger = require("redux-logger");
const logger = reduxLogger.createLogger();

const ORDER_CAKE = "Cake_Ordered";
const RESTOCK_CAKE = "Cake_Restocked";

const ORDER_ICECREAM = "IceCream_Ordered";
const RESTOCK_ICECREAM = "IceCream_Restocked";

function orderCake() {
  return {
    type: ORDER_CAKE,
    payload: 1,
  };
}
function restockCake(qty = 1) {
  return {
    type: RESTOCK_CAKE,
    payload: qty,
  };
}
function orderIce() {
  return {
    type: ORDER_ICECREAM,
    payload: 1,
  };
}
function restockIce(qty = 1) {
  return {
    type: RESTOCK_ICECREAM,
    payload: qty,
  };
}

let initialCakeState = {
  cakesNumber: 10,
};
let initialIceState = {
  IceNumber: 20,
};

const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case ORDER_CAKE:
      return produce(state, (draft) => {
        draft.cakesNumber -= action.payload;
      });

    case RESTOCK_CAKE:
      return produce(state, (draft) => {
        draft.cakesNumber += action.payload;
      });

    default:
      return state;
  }
};
const iceReducer = (state = initialIceState, action) => {
  switch (action.type) {
    case ORDER_ICECREAM:
      return produce(state, (draft) => {
        draft.IceNumber -= action.payload;
      });

    case RESTOCK_ICECREAM:
      return produce(state, (draft) => {
        draft.IceNumber += action.payload;
      });

    default:
      return state;
  }
};

const rootReducer = combineReducers({
  cake: cakeReducer,
  ice: iceReducer,
});

const store = createStore(rootReducer, applyMiddleware(logger));

const unsubscribe = store.subscribe(() => {});
console.log("Initial State: ", store.getState());

const actions = bindActionsCreators(
  { orderCake, restockCake, orderIce, restockIce },
  store.dispatch
);

actions.orderCake();
actions.orderCake();
actions.orderCake();
actions.restockCake(2);
actions.orderIce();
actions.orderIce();
actions.restockIce(1);

unsubscribe();
