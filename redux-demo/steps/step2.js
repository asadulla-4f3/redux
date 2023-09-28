/*
 * Using only redux
 * Step2: with two actions.
 */

const { legacy_createStore } = require("redux");

/*
 * Initialize state.
 */

const initialState = {
  numOfCakes: 10,
};

/*
 * Create actions.
 */

const BUY_CAKE = "BUY_CAKE";
const RESTOCK_CAKES = "RESTOCK_CAKES";

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

/*
 * Create Reducers.
 * Add new switch case for action type `RESTOCK_CAKES`
 */

const reducer = (state = initialState, action) => {
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

const store = legacy_createStore(reducer);
console.log("Initial state", store.getState());
const unsubscribe = store.subscribe(() =>
  console.log("Updated State", store.getState())
);
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
/*
 * Add dispatch for restockCakes method.
 */
store.dispatch(restockCakes(3));

unsubscribe();
