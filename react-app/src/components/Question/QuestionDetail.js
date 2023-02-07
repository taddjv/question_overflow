import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { UserContext, useUser } from "../../context/userContext";
import * as answerActions from "../../store/answer";
import * as questionActions from "../../store/question";
import IndividualAnswer from "../answer/IndividualAnswer";
import "./QuestionDetail.css";

function QuestionDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user, setUser } = useUser();
  //!set logic for user login

  const answers = useSelector((state) => state.answersReducer.answer);
  const question = useSelector((state) => state.questionsReducer.question);

  const [editQuestion, setEditQuestion] = useState(false);
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionDetail, setQuestionDetail] = useState("");
  const [questionUrl, setQuestionUrl] = useState("");

  const editSubmit = (e) => {
    e.preventDefault();
    const editedQuestion = {
      question: questionTitle || question.question,
      detail: questionDetail || question.detail,
      url: questionUrl || question.url,
    };
    dispatch(questionActions.putTheQuestion(editedQuestion, id))
      .then(() => {
        setQuestionDetail("");
        setQuestionTitle("");
        setQuestionUrl("");
        setEditQuestion(false);
      })
      .catch(async (res) => {
        console.log("unauthorized bro");
      });
  };

  useEffect(() => {
    dispatch(questionActions.getTheQuestion(id));
    dispatch(answerActions.getTheAnswers(id));

    // dispatch(answerActions.getTheAnswersCount());
  }, []);

  return (
    <>
      {question && question.user && answers && (
        <>
          {editQuestion ? (
            <form
              className="individual-question-container"
              onSubmit={editSubmit}
            >
              <div className="user-timestamp-question-con">
                <div className="username-timestamp">
                  <div className="ind-ques-username">
                    {question.user.username} asks
                  </div>
                  <div className="ind-ques-timestamp">
                    Posted on {question.dateCreated}
                  </div>
                </div>

                <input
                  className={null}
                  type="text"
                  value={questionTitle || question.question}
                  onChange={(e) => {
                    setQuestionTitle(e.target.value);
                  }}
                ></input>
                <textarea
                  className={null}
                  type="text"
                  value={questionDetail || question.detail}
                  onChange={(e) => {
                    setQuestionDetail(e.target.value);
                  }}
                  rows={3}
                  cols={5}
                />
                <input
                  className={null}
                  type="text"
                  value={questionUrl || question.url}
                  onChange={(e) => {
                    setQuestionUrl(e.target.value);
                  }}
                ></input>
              </div>

              <div className={null}>
                <span
                  className="edit-button"
                  onClick={() => {
                    setEditQuestion(false);
                  }}
                >
                  cancel
                </span>
              </div>
              {/* the submit button has tbe outside of the div. It needs to be a direct child of form */}
              <button className={null} type="submit">
                Apply Changes
              </button>
            </form>
          ) : (
            <>
              <div className="individual-question-container">
                <div className="user-timestamp-question-con">
                  <div className="username-timestamp">
                    <div className="ind-ques-username">
                      {question.user.username} asks
                    </div>
                    <div className="ind-ques-timestamp">
                      Posted on {question.dateCreated}
                    </div>
                  </div>

                  <div className="ind-ques-title">{question.question}</div>
                  <div className="ind-ques-body">{question.detail}</div>
                  <div className="ind-ques-image">Optional image goes here</div>
                </div>

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
                          console.log("worked");
                        })
                        .catch(async (res) => {
                          console.log("unauthorized bro");
                        });
                    }}
                  >
                    delete
                  </button>
                </div>
              </div>
            </>
          )}
          <div className="all-answer-container">
            <div className="individual-answer">
              REPLIES
              {answers
                ? answers.answers.map((ele, i) => {
                    return (
                      <>
                        <IndividualAnswer
                          id={ele.id}
                          answer={ele.answer}
                          question_id={ele.question_id}
                          user_id={ele.user_id}
                          url={ele.url}
                          dateCreated={ele.dateCreated}
                        />
                      </>
                    );
                  })
                : null}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default QuestionDetail;
