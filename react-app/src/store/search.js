const GET_SEARCHES = "search/GET_SEARCHES";
const GET_USER_SEARCHES = "search/GET_USER_SEARCHES";
const DELETE_SEARCHES = "search/DELETE_SEARCHES";

const getSearch = () => {
  return {
    type: GET_SEARCHES,
  };
};

const userSearch = (userId) => {
  return {
    type: GET_USER_SEARCHES,
    userId,
  };
};

const removeSearches = () => {
  return {
    type: DELETE_SEARCHES,
  };
};

export const getTheSearch = () => async (dispatch) => {
  const response = await fetch(`/api/search`);
  if (response.ok) {
    const data = response.json();
    dispatch(getSearch);
    return data;
  }
};

export const userTheSearch = (userId) => async (dispatch) => {
  const response = await fetch(`/api/search/${userId}`);
  if (response.ok) {
    const data = response.json();
    dispatch(userSearch);
    return data;
  }
};

export const deleteTheSearches = () => async (dispatch) => {
  const response = await fetch("/api/search", {
    method: "DELETE",
  });
  const data = await response.json();
  dispatch(removeSearches);
  if (response.ok) {
    return data;
  }
};

 initialState = {};

const searchReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_SEARCHES:
      newState = { ...state };
      newState.searches = action.payload;
      return newState;
    case GET_USER_SEARCHES: {
      const newState = { ...state };
      newState.searches = action.payload;
      return newState;
    }
    case DELETE_SEARCHES:
      newState = { ...state };
      delete newState[action.searches];
      return newState;
    default:
      return state;
  }
};

export default searchReducer;
