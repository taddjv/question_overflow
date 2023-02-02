const GET_ANSWER = "answers/GET_ANSWER";
const GET_ANSWERS = "answers/GET_ANSWERS";
const POST_ANSWER = "answers/POST_ANSWER";
const PUT_ANSWER = "answers/PUT_ANSWER";
const DELETE_ANSWER = "answers/DELETE_ANSWER";

const getAnswers = (answers) => {
  return {
    type: GET_ANSWERS,
    payload: answers,
  };
};
const getAnswer = (answer) => {
  return {
    type: GET_ANSWER,
    payload: answer,
  };
};
const postAnswer = (answer) => {
  return {
    type: POST_ANSWER,
    payload: answer,
  };
};
const putAnswer = (answer) => {
  return {
    type: PUT_ANSWER,
    payload: answer,
  };
};
const deleteAnswer = () => {
  return {
    type: DELETE_ANSWER,
  };
};

export const getTheAnswers = () => async (dispatch) => {
  const response = await fetch("/api/answers");

  if (response.ok) {
    const data = await response.json();
    dispatch(getAnswers);
    return data;
  }
};
export const getTheAnswer = (id) => async (dispatch) => {
  const response = await fetch(`/api/answers/${id}`);

  if (response.ok) {
    const data = await response.json();
    dispatch(getAnswer);
    return data;
  }
};
export const postTheAnswer = (answerData) => async (dispatch) => {
  const response = await fetch("/api/answers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(answerData),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(postAnswer);
    return data;
  }
};
export const putTheAnswer = (answerData, id) => async (dispatch) => {
  const response = await fetch(`/api/answers/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(answerData),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(putAnswer);
    return data;
  }
};
export const deleteTheAnswer = (id) => async (dispatch) => {
  const response = await fetch(`/api/answers/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(deleteAnswer);
    return data;
  }
};

<<<<<<< HEAD
let initialState = {};
=======
const initialState = {};
>>>>>>> cfda8aa54fd8326176561ce8c55f76fc46631e64
const answersReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_ANSWERS:
      newState = Object.assign({}, state);
      newState.answer = action.payload;
      return newState;
    case GET_ANSWER:
      newState = Object.assign({}, state);
      newState.answer = action.payload;
      return newState;
    case POST_ANSWER:
      newState = Object.assign({}, state);
      newState.answer = action.payload;
      return newState;
    case PUT_ANSWER:
      newState = Object.assign({}, state);
      newState.answer = action.payload;
      return newState;
    case DELETE_ANSWER:
      newState = Object.assign({}, state);
      return newState;
    default:
      return state;
  }
};

export default answersReducer;
