# Redux-Toolkit demo

- Redux toolkit is the official, opinionated, batteries-included tool-set for efficient Redux development.
- It is also intended to be the standard way to write Redux logic in your application.

## Why Redux Toolkit?

- **Redux** is great, but it does have a few shortcomings.
  - Configuring redux in an app seems complicated.
  - In addition to redux, a lot of other packages have to be installed to get redux to do something useful.
  - Redux requires too much boilerplate code.
- **Redux toolkit** serves as an abstraction over Redux. It hides the difficult parts ensuring you have a good developer experience.

### Redux Toolkit (RTK) featuring React

Redux or Redux toolkit don't need a UI library to work.

RTK + React

### React-Redux

React-Redux is the official Redux UI binding library for React.

```
    React <---->  React-Redux <----> Redux (Redux Toolkit)
```

### Installations:

node used - 20.7.0

run the code with just node on the terminal.

```
npm i redux
```

```
npm i immer
```

For logging the redux state, we will use the `redux-logger` library.

```
npm i redux-logger
```

For Async calls, we will use `axios` and `redux-thunk`.

```
npm i axios redux-thunk
```

## Lets discuss about Redux first. 👇 Below points are about Redux.

### Three Core Concepts:

A **Store** that holds the state of the application.

An **action** that describes what happened in the application.

A **reducer** which handles the action and decides how to update the state.

### Actions

- The only way your application can interact with the store.
- Carry some information from your app to the redux store.
- Plain JavaScript objects.
- Have a `type` property that describes something that happened in the application.
- The `type` property is typically defined as string constants.

### Reducers

- Specify how the app's state changes in response to actions sent to the store.
- Function that accepts state and action as arguments, and returns the next state of the application.

(prevState, action) => newState

### Redux Store:

One store for the entire application.

Responsibilities:<br>

- Holds application state.
- Allows access to state via **_getState_**
- Allows state to be updated via **_dispatch(action)_**
- Registers listeners via **_subscribe(listener)_**
- Handles unregister of listeners via the function returned by **_subscribe(listener)_**
- At the end we can unsubscribe from the store by **_unsubscribe()_**

### Immer:

Immer library can be used for updating the `nested state object inside the reducers` as follows:

Here, we should maintain `state` as an `immutable` way and we only update the state with assigning new objects instead of updating the present state.

We can use `produce` method from immer and update the state inside the reducer as an a mutable way (but if we check `produce` method its not a mutable way of update). This produce method internally uses immutability and update the state in the same normal manner (like we did for nested state update). Its acts like a wrapper.

```
const { produce } = require("immer");

const userAddressReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case UPDATE_USER_ADDRESS_STREET:
      /**
       * Using immer we can change this nested updating object to simply a single line.
       <!-- return {
        ...state,
        address: {
          ...state.address,
          street: action.payload, -->
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
```
