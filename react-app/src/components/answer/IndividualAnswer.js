import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect, useParams, useHistory } from "react-router-dom";
import { useUser } from "../../context/userContext";
import * as answerActions from "../../store/answer";
import * as reactionActions from "../../store/reaction";
import usersReducer, * as userActions from "../../store/user";
import "./IndividualAnswer.css"


function IndividualAnswers({
  id,
  user_id,
  question_id,
  answer,
  url,
  dateCreated,
}) {
  const dispatch = useDispatch();
  const { user, setUser } = useUser();

  const answerState = useSelector((state) => state.answersReducer.answer.answers[id - 1]);


  const [editAnswer, setEditAnswer] = useState(false);
  const [answerDetail, setAnswerDetail] = useState("");
  const [answerUrl, setAnswerUrl] = useState("");

  const editSubmit = (e) => {
    e.preventDefault();
    const editedAnswer = {
      detail: answerDetail || answerState.answer,
      url: answerUrl || answerState.url,
    };
    dispatch(answerActions.putTheAnswer(editedAnswer, id))
      .then(() => {
        setAnswerDetail("")
        setAnswerUrl("");
        setEditAnswer(false);
      })
      .catch(async (res) => {
        console.log("unauthorized bro");
      });
  };


  useEffect(() => {
    dispatch(answerActions.getTheAnswers(id));
  }, []);



  //!set logic for user login
  //! create a function for reactions (upvotes downvotes etc)




      return (

      // ):( ORRRR
        <>
        <div className="ans-vote-container">
          <div className="vote-container">
            <div className="upvote-con">
              <div className="upvote-total"> upvote total here</div>
              <div className="thumbs-up-button">upvote button</div>
            </div>
            <div className="downvote-con">
            <div className="thumbs-down-button">downvote button</div>
            <div className="downvote-total"> downvote total here</div>
          </div>
        </div>

        <div className="ans-container">
          <div className="ans-body-and-user-con">
            <div className="ans-detail-con">{answer}  </div>

            <div className="ans-user-details">
              <div className="ans-timestamp">Posted on</div>
              <div className="ans-user-pfp">profile pic</div>
              <div className="ans-username"> by username </div>
            </div>

          </div>

            <div className="ans-crud-options">
              <button className="edit-button"
              onClick={() => {

              }}
              >edit</button>
              <button className="delete-button">delete</button>
            </div>

          </div>

        </div>
    </>
  );
}

export default IndividualAnswers;
