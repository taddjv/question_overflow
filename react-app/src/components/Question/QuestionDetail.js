import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
// import { UserContext, useUser } from "../../context/userContext";
import * as answerActions from "../../store/answer";
import * as questionActions from "../../store/question";
import * as sessionActions from "../../store/session";
import IndividualAnswer from "../answer/IndividualAnswer";
import { renderQuestions } from "../../helper/questionHelper";
import "./QuestionDetail.css";

function QuestionDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const answers = useSelector(
    (state) => state.answersReducer[`question-${id}`]
  );
  const question = useSelector((state) => state.questionsReducer.question);
  const user = useSelector((state) => state.session?.user);

  const [editQuestion, setEditQuestion] = useState(false);
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionDetail, setQuestionDetail] = useState("");
  const [questionUrl, setQuestionUrl] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const [newAnswerUrl, setNewAnswerUrl] = useState("");

  const renderAnswers = (answerObj) => {
    const answers = [];
    for (let answer in answerObj) {
      answers.push(
        <IndividualAnswer
          id={answerObj[answer].id}
          answer={answerObj[answer]}
          question_id={answerObj[answer].question_id}
          user_id={answerObj[answer].user_id}
          url={answerObj[answer].url}
          dateCreated={answerObj[answer].dateCreated}
          reactions={answerObj[answer].reactions}
          user={user}
        />
      );
    }
    return answers;
  };

  const editSubmit = (e) => {
    e.preventDefault();
    const editedQuestion = {
      question: questionTitle || question.question,
      detail: questionDetail || question.detail,
      url: questionUrl || question.url,
    };
    dispatch(questionActions.putTheQuestion(editedQuestion, id)).then(() => {
      setQuestionDetail("");
      setQuestionTitle("");
      setQuestionUrl("");
      setEditQuestion(false);
    });
  };

  const addAnswer = (e) => {
    e.preventDefault();

    const data = {
      answer: newAnswer,
      url: newAnswerUrl,
    };

    dispatch(answerActions.postTheAnswer(data, id, user))
      .then(() => {
        setNewAnswer("");
        setNewAnswerUrl("");
        console.log("it works");
      })
      .catch(() => {
        console.log("did not work");
      });
  };

  useEffect(() => {
    dispatch(questionActions.getTheQuestion(id));
    dispatch(answerActions.getTheAnswers(id));
    dispatch(sessionActions.authenticate());
  }, [dispatch, questionTitle, questionUrl, questionDetail, id]);

  return (
    <>
      {question && question.user && answers && (
        <>
          <div className="question-and-answers-body">
            {editQuestion ? (
              <form
                className="individual-question-container-edit"
                onSubmit={editSubmit}
              >
                <div className="username-timestamp">
                  <div className="ind-ques-username">
                    {question.user.username} asks
                  </div>
                  <div className="ind-ques-timestamp">
                    Posted on {question.dateCreated}
                  </div>
                </div>

                <div className="ques-input-con">
                  <input
                    className="edit-ques-title"
                    type="text"
                    value={questionTitle || question.question}
                    onChange={(e) => {
                      setQuestionTitle(e.target.value);
                    }}
                  ></input>
                  <textarea
                    className="edit-ques-body"
                    type="text"
                    value={questionDetail || question.detail}
                    onChange={(e) => {
                      setQuestionDetail(e.target.value);
                    }}
                    rows={3}
                    cols={5}
                  />
                  <input
                    className="edit-ques-url"
                    type="text"
                    value={questionUrl || question.url}
                    onChange={(e) => {
                      setQuestionUrl(e.target.value);
                    }}
                  ></input>
                </div>
                <div className="ques-edit-crud-buttons">
                  <div className="edit-button">
                    <span
                      className="edit-button"
                      onClick={() => {
                        setEditQuestion(false);
                      }}
                    >
                      <button className="cancel-button">cancel</button>
                    </span>
                  </div>
                  {/* the submit button has tbe outside of the div. It needs to be a direct child of form */}
                  <button className="edit-submit" type="submit">
                    Apply Changes
                  </button>
                </div>
              </form>
            ) : (
              <>
                <div className="individual-question-container">
                  <div className="user-timestamp-question-con">
                    <div className="username-timestamp">
                      <div className="ind-ques-username">
                        {question?.user?.username} asks
                      </div>
                      <div className="ind-ques-timestamp">
                        Posted on {question.dateCreated}
                      </div>
                    </div>

                    <div className="ind-ques-title">{question.question}</div>
                    <div className="ind-ques-body">{question.detail}</div>
                    <div className="ind-ques-image">
                      {question?.url ? <img src={question.url} alt="" /> : null}
                    </div>
                  </div>
                  {question?.user?.username === user?.username && (
                    <>
                      <div className="ind-ques-cruds">
                        <button
                          className="edit-button"
                          onClick={() => {
                            setEditQuestion(true);
                          }}
                        >
                          edit
                        </button>

                        <button
                          className="delete-button"
                          onClick={() => {
                            dispatch(questionActions.deleteTheQuestion(id))
                              .then(() => {
                                history.push("/");
                              })
                              .catch(async (res) => {});
                          }}
                        >
                          delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </>
            )}
            <form onSubmit={addAnswer} className="add-answer">
              <textarea
                value={newAnswer}
                onChange={(e) => {
                  setNewAnswer(e.target.value);
                }}
                rows={2}
                cols={3}
              />
              <input
                value={newAnswerUrl}
                onChange={(e) => {
                  setNewAnswerUrl(e.target.value);
                }}
              />
              <button type="submit">add answer</button>
            </form>
            <div className="all-answer-container">
              <div className="individual-answer">
                <div className="replies-banner">replies</div>

                {answers && renderAnswers(answers)}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default QuestionDetail;
