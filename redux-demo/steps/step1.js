/*
 * Using only redux
 * Step1: with only one action.
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

const buyCake = () => {
  return {
    type: BUY_CAKE,
  };
};

/*
 * Create Reducers.
 */

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        ...state,
        numOfCakes: state.numOfCakes - 1,
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

unsubscribe();
