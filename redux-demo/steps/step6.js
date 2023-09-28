/*
 * Using only redux
 * Step6: Use immer
 * Lets take an example of updating the users details like address.
 * Considering the nested state object.
 */

const { legacy_createStore } = require("redux");
const { produce } = require("immer");

/*
 * Initialize state for existing User details.
 */

const initialUserState = {
  username: "Asadulla",
  email: "asd@asd.com",
  address: {
    street: "123 ABC street",
    area: "ABCD area",
    pin: 123456,
  },
};

/*
 * Create actions.
 */

const UPDATE_USER_ADDRESS_STREET = "UPDATE_USER_ADDRESS_STREET";

const updateUserAddressStreet = (newStreet) => {
  return {
    type: UPDATE_USER_ADDRESS_STREET,
    payload: newStreet,
  };
};

/*
 * Create Reducers.
 * Add new switch case for `ICE_CREAMS` action types
 */

const userAddressReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case UPDATE_USER_ADDRESS_STREET:
      /**
       * Using immer we can change this nested updating object to simply a single line.
       * return {
        ...state,
        address: {
          ...state.address,
          street: action.payload,
        },
      };
       */
      return produce(state, (draft) => {
        draft.address.street = action.payload;
      });
    default:
      return state;
  }
};

const store = legacy_createStore(userAddressReducer);
console.log("Initial state", store.getState());
const unsubscribe = store.subscribe(() =>
  console.log("Updated State", store.getState())
);
store.dispatch(updateUserAddressStreet("456 DEF street"));

unsubscribe();
