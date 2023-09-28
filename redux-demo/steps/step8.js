/*
 * Using only redux
 * Step8: Use Middleware - redux-thunk for Asynchronous calls.
 */

const {
  legacy_createStore,
  combineReducers,
  applyMiddleware,
} = require("redux");
const logger = require("redux-logger").createLogger();
const thunkMiddleware = require("redux-thunk").default;
const axios = require("axios");

/*
 * Initialize state for both CAKE, and ICE_CREAM
 * And initialize state for Users.
 */

const initialCakeState = {
  numOfCakes: 10,
};

const initialIceCreamState = {
  numOfIceCreams: 10,
};

const userState = {
  users: [],
  loading: false,
  error: "",
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

// Actions for Fetch Users.
const FETCH_USERS_REQUESTED = "FETCH_USERS_REQUESTED";
const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";

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

const fetchUsersRequested = () => {
  return {
    type: FETCH_USERS_REQUESTED,
  };
};
const fetchUsersSuccess = (users) => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: users,
  };
};
const fetchUsersFailure = (error) => {
  return {
    type: FETCH_USERS_FAILURE,
    payload: error,
  };
};
/*
 * Create Reducers.
 * Add the reducer for Fetch users
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
const fetchUsersReducer = (state = userState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USERS_SUCCESS:
      return {
        loading: false,
        users: action.payload,
        error: "",
      };
    case FETCH_USERS_FAILURE:
      return {
        loading: false,
        users: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

/**
 * Define Async action creators.
 */
const fetchUsers = () => {
  return function (dispatch) {
    dispatch(fetchUsersRequested());
    axios
      .get("https://jsonplaceholder.typicode.com/uss")
      .then((response) => {
        const users = response.data.map((user) => user.id);
        dispatch(fetchUsersSuccess(users));
      })
      .catch((err) => {
        // console.log("ERROR: ", err);
        dispatch(fetchUsersFailure(err.message));
      });
  };
};

const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer,
  users: fetchUsersReducer,
});
/*
 * Use Middlewares.
 */

const store = legacy_createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware, logger)
);
console.log("Initial state", store.getState());
const unsubscribe = store.subscribe(() => {});
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
console.log("<--------------->");

store.dispatch(fetchUsers());
unsubscribe();
