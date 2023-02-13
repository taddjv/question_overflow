const GET_UPVOTES = "reactions/GET_UPVOTES";
const GET_DOWNVOTES = "reactions/GET_DOWNVOTES";

const POST_UPVOTE = "reactions/POST_UPVOTE";
const POST_DOWNVOTE = "reactions/POST_DOWNVOTE";

const GET_VOTES = "reactions/GET_VOTES";

const getVotes = (reactions) => {
  return {
    type: GET_VOTES,
    payload: reactions,
  };
};

const getUpvotes = (reactions) => {
  return {
    type: GET_UPVOTES,
    payload: reactions,
  };
};

const getDownvotes = (reactions) => {
  return {
    type: GET_DOWNVOTES,
    payload: reactions,
  };
};

const postUpvote = (reaction) => {
  return {
    type: POST_UPVOTE,
    payload: reaction,
  };
};

const postDownvote = (reaction) => {
  return {
    type: POST_DOWNVOTE,
    payload: reaction,
  };
};

export const getTheVotes = (id) => async (dispatch) => {
  const response = await fetch(`/api/reactions/answers/${id}`);
  console.log(response, " <---- from the thunk");
  if (response.ok) {
    const data = await response.json();
    dispatch(getVotes(id));
    return data;
  }
};

export const getTheUpvotes = (id) => async (dispatch) => {
  const response = await fetch(`/api/reactions/answers/${id}/up-votes`);

  if (response.ok) {
    const data = await response.json();
    dispatch(getUpvotes);
    return data;
  }
};

export const getTheDownvotes = (id) => async (dispatch) => {
  const response = await fetch(`/api/reactions/answers/${id}/down-votes`);

  if (response.ok) {
    const data = await response.json();

    dispatch(getDownvotes);
    return data;
  }
};

export const postTheUpvote = (id) => async (dispatch) => {
  const response = await fetch(`/api/reactions/answers/${id}/up-vote`, {
    method: "POST",
  });
 
  if (response.ok) {
    const data = await response.json();
    dispatch(postUpvote(id));
    return data;
  }
};

export const postTheDownvote = (id) => async (dispatch) => {
  const response = await fetch(`/api/reactions/answers/${id}/down-vote`, {
    method: "POST",
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(postDownvote(id));
    return data;
  }
};

let initialState = {};
const reactionsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {

    case GET_VOTES: {
      const newState = {
        ...action.payload.reactions,
      };
      // action.payload.reactions.forEach((ele) => {
      //   newState[ele.id] = ele;
      // });
      return newState;
    }

    case GET_UPVOTES: {
      const newState = Object.assign({}, state);
      //?   newState.reaction.up_vote = action.payload;
      newState.reaction = action.payload;
      return newState;
    }

    case GET_DOWNVOTES:
      newState = Object.assign({}, state);
      //?   newState.reaction.down_vote = action.payload;
      newState.reaction = action.payload;
      return newState;

    case POST_UPVOTE: {
      const newState = Object.assign({}, state);
      //?   newState.reaction.up_vote = action.payload;
      newState.reaction = action.payload;
      return newState;
    }

    case POST_DOWNVOTE:
      newState = Object.assign({}, state);
      //?   newState.reaction.down_vote = action.payload;
      newState.reaction = action.payload;
      return newState;

    default:
      return state;
  }
};

export default reactionsReducer;
