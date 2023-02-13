const GET_QUESTIONS = "questions/GET_QUESTIONS";
const GET_QUESTION = "questions/GET_QUESTION";
const POST_QUESTION = "questions/POST_QUESTION";
const PUT_QUESTION = "questions/PUT_QUESTION";
const DELETE_QUESTION = "questions/DELETE_QUESTION";

const getQuestions = (questions) => {
  return {
    type: GET_QUESTIONS,
    payload: questions,
  };
};
const getQuestion = (question) => {
  return {
    type: GET_QUESTION,
    payload: question,
  };
};
const postQuestion = (question, id) => {
  return {
    type: POST_QUESTION,
    payload: question,
  };
};
const putQuestion = (question, id) => {
  return {
    type: PUT_QUESTION,
    payload: question,
    id: id,
  };
};
const deleteQuestion = (id) => {
  return {
    type: DELETE_QUESTION,
    id: id,
  };
};

export const getTheQuestions = () => async (dispatch) => {
  const response = await fetch("/api/questions/");

  if (response.ok) {
    const data = await response.json();

    dispatch(getQuestions(data));
    return data;
  }
};
export const getTheQuestion = (id) => async (dispatch) => {
  const response = await fetch(`/api/questions/${id}`);

  if (response.ok) {
    const data = await response.json();
    dispatch(getQuestion(data));
    return data;
  }
};
export const postTheQuestion = (questionData) => async (dispatch) => {
  const { question, detail, url, user } = questionData;

  const response = await fetch("/api/questions/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      question,
      detail,
      url,
    }),
  });
  const data = await response.json();
  // console.log(data);
  if (response.ok) {
    data["answers"] = [];
    data["user"] = user;
    dispatch(postQuestion(data));

    return data;
  } else {
    return data;
  }
};
export const putTheQuestion = (questionData, id) => async (dispatch) => {
  const response = await fetch(`/api/questions/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(questionData),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(putQuestion(data, id));

    return data;
  }
};
export const deleteTheQuestion = (id) => async (dispatch) => {
  const response = await fetch(`/api/questions/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(deleteQuestion(id));
    return data;
  }
};

let initialState = {};

const questionsReducer = (state = initialState, action) => {
  let newState;

  switch (action.type) {
    case GET_QUESTIONS:
      newState = Object.assign({}, state);
      newState["allQuestions"] = {};
      action.payload.questions.forEach((ele) => {
        newState["allQuestions"][ele.id] = ele;
      });
      newState.question = action.payload;
      return newState;

    case GET_QUESTION:
      newState = Object.assign({}, state);
      newState.question = action.payload;
      return newState;

    case POST_QUESTION:
      newState = Object.assign({}, state);

      newState["allQuestions"][`${action.payload.id}`] = action.payload;
      return newState;

    case PUT_QUESTION:
      newState = Object.assign({}, state);
      newState["question"].question = action.payload.question;
      newState["question"].detail = action.payload.detail;
      newState["question"].url = action.payload.url;
      return newState;

    case DELETE_QUESTION:
      newState = Object.assign({}, state);
      delete newState["question"];
      return newState;

    default:
      return state;
  }
};

export default questionsReducer;
