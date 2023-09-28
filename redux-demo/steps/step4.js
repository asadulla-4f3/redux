/*
 * Using only redux
 * Step4: Use two reducers.
 */

const { legacy_createStore, combineReducers } = require("redux");

/*
 * Initialize state for both CAKE, and ICE_CREAM
 * To use two reducers, we need to initialize two state objects.
 */

const initialCakeState = {
  numOfCakes: 10,
};

const initialIceCreamState = {
  numOfIceCreams: 10,
};

/*
 * Create actions.
 */

// Actions for CAKES
const BUY_CAKE = "BUY_CAKE";
const RESTOCK_CAKES = "RESTOCK_CAKES";

// Actions for ICE_CREAMS
const BUY_ICE_CREAM = "BUY_ICE_CREAM";
const RESTOCK_ICE_CREAM = "RESTOCK_ICE_CREAM";

const buyCake = () => {
  return {
    type: BUY_CAKE,
  };
};

const restockCakes = (qty = 1) => {
  return {
    type: RESTOCK_CAKES,
    payload: qty,
  };
};

const buyIceCream = () => {
  return {
    type: BUY_ICE_CREAM,
  };
};

const restockIceCream = (qty = 1) => {
  return {
    type: RESTOCK_ICE_CREAM,
    payload: qty,
  };
};

/*
 * Create Reducers.
 * Add new switch case for `ICE_CREAMS` action types
 */

const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        ...state,
        numOfCakes: state.numOfCakes - 1,
      };
    case RESTOCK_CAKES:
      return {
        ...state,
        numOfCakes: state.numOfCakes + action.payload,
      };
    default:
      return state;
  }
};
const iceCreamReducer = (state = initialIceCreamState, action) => {
  switch (action.type) {
    case BUY_ICE_CREAM:
      return {
        ...state,
        numOfIceCreams: state.numOfIceCreams - 1,
      };
    case RESTOCK_ICE_CREAM:
      return {
        ...state,
        numOfIceCreams: state.numOfIceCreams + action.payload,
      };
    default:
      return state;
  }
};

/*
 * To use multiple reducers, we need to combine the reducers.
 */

const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer,
});

const store = legacy_createStore(rootReducer);
console.log("Initial state", store.getState());
const unsubscribe = store.subscribe(() =>
  console.log("Updated State", store.getState())
);
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(restockCakes(3));
/*
 * Add dispatch for IceCream.
 */
console.log("<--------------->");
store.dispatch(buyIceCream());
store.dispatch(buyIceCream());
store.dispatch(buyIceCream());
store.dispatch(restockIceCream(3));
unsubscribe();
