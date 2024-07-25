const axios = require("axios");
const redux = require("redux");
const createStore = redux.createStore;
const produce = require("immer").produce;
const thunk = require("redux-thunk").default;
const applyMiddleware = redux.applyMiddleware;

const initialState = {
  loading: false,
  users: [],
  error: "",
};

const USERS_REQUESTED = "USERS-REQUESTED";
const USERS_SUCCEDEED = "USERS_SUCCEEDED";
const USERS_FAILED = "USERS_FAILED";

function requestUsers() {
  return {
    type: USERS_REQUESTED,
  };
}

function succededUsers(users) {
  return {
    type: USERS_SUCCEDEED,
    payload: users,
  };
}

function failedUsers(error) {
  return {
    type: USERS_FAILED,
    payload: error,
  };
}

const fetchUsers = () => {
  return function (dispatch) {
    dispatch(requestUsers());
    axios("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        const users = response.data.map((user) => user.id);
        dispatch(succededUsers(users));
      })
      .catch((error) => {
        dispatch(failedUsers(error.message));
      });
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case USERS_REQUESTED:
      return produce(state, (draft) => {
        draft.loading = true;
      });

    case USERS_SUCCEDEED:
      return produce(state, (draft) => {
        draft.loading = false;
        draft.users = action.payload;
      });

    case USERS_FAILED:
      return produce(state, (draft) => {
        draft.loading = false;
        draft.error = action.payload;
      });

    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(thunk));

store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(fetchUsers());
