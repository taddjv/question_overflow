const GET_ANSWER = "answers/GET_ANSWER";
const GET_ANSWERS = "answers/GET_ANSWERS";
const GET_ANSWERS_COUNT = "answers/GET_ANSWERS_COUNT";
const POST_ANSWER = "answers/POST_ANSWER";
const PUT_ANSWER = "answers/PUT_ANSWER";
const DELETE_ANSWER = "answers/DELETE_ANSWER";

const getAnswers = (answers, id) => {
  return {
    type: GET_ANSWERS,
    payload: answers,
    id: id,
  };
};
const getAnswer = (answer) => {
  return {
    type: GET_ANSWER,
    payload: answer,
  };
};

const getAnswersCount = () => {
  return {
    type: GET_ANSWERS_COUNT,
  };
};

const postAnswer = (answer, questionId) => {
  return {
    type: POST_ANSWER,
    payload: answer,
    questionId: questionId,
  };
};
const putAnswer = (answer, id, questionId) => {
  return {
    type: PUT_ANSWER,
    payload: answer,
    id: id,
    questionId: questionId,
  };
};
const deleteAnswer = (id, questionId) => {
  return {
    type: DELETE_ANSWER,
    id: id,
    questionId: questionId,
  };
};

export const getTheAnswers = (id) => async (dispatch) => {
  const response = await fetch(`/api/answers/questions/${id}`);

  if (response.ok) {
    const data = await response.json();
    dispatch(getAnswers(data, id));
    return data;
  }
};

export const getTheAnswer = (id) => async (dispatch) => {
  const response = await fetch(`/api/answers/${id}`);

  if (response.ok) {
    const data = await response.json();
    dispatch(getAnswer(data));
    return data;
  }
};
export const getTheAnswersCount = () => async (dispatch) => {
  const response = await fetch("/api/answers/");

  if (response.ok) {
    const data = await response.json();
    dispatch(getAnswersCount);
    return data;
  }
};
export const postTheAnswer =
  (answerData, questionId, user) => async (dispatch) => {
    const response = await fetch(`/api/answers/questions/${questionId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(answerData),
    });
    if (response.ok) {
      const data = await response.json();
      data["reactions"] = [];
      data["user"] = user;
      dispatch(postAnswer(data, questionId));
      return data;
    } else if (response) {
      const data = await response.json();
      return data;
    }
  };
export const putTheAnswer =
  (answerData, id, questionId) => async (dispatch) => {
    const response = await fetch(`/api/answers/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(answerData),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(putAnswer(data, id, questionId));
      return data;
    } else if (response) {
      const data = await response.json();

      return data;
    }
  };
export const deleteTheAnswer = (id, questionId) => async (dispatch) => {
  const response = await fetch(`/api/answers/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(deleteAnswer(id, questionId));
    return data;
  }
};

let initialState = {};
const answersReducer = (state = initialState, action) => {
  // let newState;
  switch (action.type) {
    case GET_ANSWERS: {
      const newState = {};

      action.payload.answers.forEach((ele) => {
        newState[ele.id] = ele;
      });
      return newState;
    }

    case GET_ANSWER: {
      const newState = Object.assign({}, state);
      newState.answer = action.payload;
      return newState;
    }

    case GET_ANSWERS_COUNT: {
      const newState = Object.assign({}, state);
      // newState.answer = action.payload;
      return newState;
    }

    case POST_ANSWER: {
      const newState = Object.assign({}, state);
      newState[action.payload.id] = action.payload;
      return newState;
    }
    case PUT_ANSWER: {
      const newState = { ...state };
      newState[action.id].answer = action.payload.answer;
      return newState;
    }
    case DELETE_ANSWER: {
      const newState = { ...state };
      delete newState[action.id];
      return newState;
    }
    default:
      return state;
  }
};

export default answersReducer;
