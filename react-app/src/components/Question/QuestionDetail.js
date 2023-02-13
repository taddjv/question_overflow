import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
// import { UserContext, useUser } from "../../context/userContext";
import * as answerActions from "../../store/answer";
import * as questionActions from "../../store/question";
import * as sessionActions from "../../store/session";
import * as reactionActions from "../../store/reaction";
import IndividualAnswer from "../answer/IndividualAnswer";
// import { renderQuestions } from "../../helper/questionHelper";
import "./QuestionDetail.css";

function QuestionDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const answers = useSelector((state) => state.answersReducer);
  const question = useSelector((state) => state.questionsReducer.question);
  const user = useSelector((state) => state.session?.user);

  const [editQuestion, setEditQuestion] = useState(false);
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionDetail, setQuestionDetail] = useState("");
  const [questionUrl, setQuestionUrl] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const [newAnswerUrl, setNewAnswerUrl] = useState("");
  const [errors, setErrors] = useState([]);
  const [errors2, setErrors2] = useState([]);

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
      question: questionTitle,
      detail: questionDetail,
      url: questionUrl,
    };
    dispatch(questionActions.putTheQuestion(editedQuestion, id)).then(
      async (res) => {
        const data = await res;

        if (data.errors) {
          const newErrors = res.errors.map((ele) => {
            if (ele.includes("url")) {
              return "Not a valid image.";
            }
            return (
              ele.slice(0, ele.indexOf(":")) + ele.slice(ele.indexOf(":") + 7)
            );
          });
          setErrors(newErrors);
        } else {
          setQuestionDetail("");
          setQuestionTitle("");
          setQuestionUrl("");
          setEditQuestion(false);
        }
      }
    );
  };

  const addAnswer = (e) => {
    e.preventDefault();

    const data = {
      answer: newAnswer,
      url: newAnswerUrl,
    };

    dispatch(answerActions.postTheAnswer(data, id, user)).then(async (res) => {
      const data = await res;
      if (data.errors) {
        const newErrors = data.errors.map((ele) => {
          if (ele.includes("url")) {
            return "Not a valid image.";
          }
          return (
            ele.slice(0, ele.indexOf(":")) + ele.slice(ele.indexOf(":") + 7)
          );
        });
        setErrors2(newErrors);
      } else {
        setNewAnswer("");
        setNewAnswerUrl("");
        setErrors([]);
      }
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
            <div className="q-a-a-b">
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
                      placeholder="Ask question here..."
                      value={questionTitle}
                      onChange={(e) => {
                        setQuestionTitle(e.target.value);
                      }}
                    ></input>
                    <textarea
                      className="edit-ques-body"
                      type="text"
                      placeholder="Add details here..."
                      value={questionDetail}
                      onChange={(e) => {
                        setQuestionDetail(e.target.value);
                      }}
                      rows={3}
                      cols={5}
                    />
                    <input
                      className="edit-ques-url"
                      type="text"
                      placeholder="Add Image here..."
                      value={questionUrl}
                      onChange={(e) => {
                        setQuestionUrl(e.target.value);
                      }}
                    ></input>
                  </div>
                  <div className="ques-edit-crud-buttons">
                    <div className="edit-button">
                      <span className="edit-button">
                        <button
                          className="cancel-button"
                          onClick={(e) => {
                            e.preventDefault();
                            setEditQuestion(false);
                            setQuestionUrl(question.url);
                            setQuestionDetail(question.detail);
                            setQuestionTitle(question.question);
                          }}
                        >
                          cancel
                        </button>
                      </span>
                    </div>
                    {/* the submit button has tbe outside of the div. It needs to be a direct child of form */}
                    <button className="edit-submit" type="submit">
                      Apply Changes
                    </button>
                  </div>
                  <ul className="error">
                    {errors.map((ele) => (
                      <li>{ele}</li>
                    ))}
                  </ul>
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
                        {question?.url ? (
                          <img src={question.url} alt="" />
                        ) : null}
                      </div>
                    </div>
                    {question?.user?.username === user?.username && (
                      <>
                        <div className="ind-ques-cruds">
                          <button
                            className="edit-button"
                            onClick={() => {
                              setEditQuestion(true);

                              setQuestionTitle(question.question);
                              setQuestionDetail(question.detail);
                              setQuestionUrl(question.url);
                            }}
                          >
                            Edit question
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
                            Delete question
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </>
              )}
              {user && (
                <>
                <div className="add-answer-banner">
                  Add your answer {user.username}
                  </div>
                  <form onSubmit={addAnswer} className="add-answer">
                    <div className="a-a-left">
                      <img src={user?.profile_url} alt='' />
                    </div>
                    <div className="a-a-middle">
                      <input
                        id="a-a-middle1"
                        placeholder="Answer here"
                        value={newAnswer}
                        onChange={(e) => {
                          setNewAnswer(e.target.value);
                        }}
                      />
                      <input
                        id="a-a-middle2"
                        value={newAnswerUrl}
                        placeholder="Add a picture"
                        onChange={(e) => {
                          setNewAnswerUrl(e.target.value);
                        }}
                      />
                    </div>

                    <button className="a-a-button" type="submit">
                      Add answer
                    </button>
                  </form>
                  <ul className="error">
                    {errors2.map((ele) => (
                      <li>{ele}</li>
                    ))}
                  </ul>

                </>
              )}
            </div>

            <div className="all-answer-container">
              <div className="replies-banner">replies</div>
              <div className="individual-answer">
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
