const GET_USERS = "users/GET_USERS";
const GET_USER = "users/GET_USER";

const getUsers = (users) => {
  return {
    type: GET_USERS,
    payload: users,
  };
};

const getUser = (user) => {
  return {
    type: GET_USERS,
    payload: user,
  };
};

export const getTheUsers = () => async (dispatch) => {
  const response = await fetch("/api/users/");

  if (response.ok) {
    const data = await response.json();
    dispatch(getUsers(data));
    return data;
  }
};

export const getTheUser = (id) => async (dispatch) => {
  const response = await fetch(`/api/users/${id}`);

  if (response.ok) {
    const data = await response.json();
    dispatch(getUser(data));
    return data;
  }
};

let initialState = {};
const usersReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_USER:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    case GET_USERS:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    default:
      return state;
  }
};

export default usersReducer;
