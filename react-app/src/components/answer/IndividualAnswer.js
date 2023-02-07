import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect, useParams, useHistory } from "react-router-dom";
import { useUser } from "../../context/userContext";
import * as answerActions from "../../store/answer";
import * as reactionActions from "../../store/reaction";
import usersReducer, * as userActions from "../../store/user";
import "./answer.css";

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

  //!set logic for user login
  //! create a function for reactions (upvotes downvotes etc)

  return (
    <>
      <div className="ans-vote-container">
        <div className="vote-container">
          <div className="upvote-con">
            <div className="thumbs-up-button">upvote button</div>
            <div className="upvote-total"> upvote total here</div>
          </div>
          <div className="downvote-con">
            <div className="thumbs-down-button">downvote button</div>
            <div className="downvote-total"> downvote total here</div>
          </div>
        </div>

        <div className="ans-container">
          <div className="ans-detail-con">{answer}</div>

          <div className="ans-user-details">
            <div className="ans-timestamp">Posted on</div>
            <div className="ans-user-pfp">profile pic</div>
            <div className="ans-username"> by username </div>
          </div>

          <div className="ans-crud-options">
            <button className="edit-button">edit</button>
            <button className="delete-button">delete</button>
          </div>
        </div>
      </div>
      <div className="title">answer author</div>
    </>
  );
}

export default IndividualAnswers;
