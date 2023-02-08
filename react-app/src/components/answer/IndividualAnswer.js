<<<<<<< HEAD
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink, Redirect, useParams, useHistory} from "react-router-dom";
import {useUser} from "../../context/userContext";
=======
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect, useParams, useHistory } from "react-router-dom";
import { useUser } from "../../context/userContext";
>>>>>>> e6c8f871c4ba8e3399db55ea5472aa85c5ac0694
import * as answerActions from "../../store/answer";
import * as reactionActions from "../../store/reaction";
import usersReducer, * as userActions from "../../store/user";
import { getVotes } from "../../helper/questionHelper";
import "./IndividualAnswer.css";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

function IndividualAnswers({
  id,
  user_id,
  question_id,
  answer,
  url,
<<<<<<< HEAD
  dateCreated
}) {
  const dispatch = useDispatch();
  const {user, setUser} = useUser();

  // !set logic for user login
  // ! create a function for reactions (upvotes downvotes etc)


  return (
    <>
      <div className="ans-vote-container">
        <div className="vote-container">
          <div className="upvote-con">
            <div className="upvote-total">
              upvote total here</div>
            <div className="thumbs-up-button">upvote button</div>
          </div>
          <div className="downvote-con">
            <div className="thumbs-down-button">downvote button</div>
            <div className="downvote-total">
              downvote total here</div>
          </div>
        </div>

        <div className="ans-container">
          <div className="ans-detail-con">
            {answer}</div>

          <div className="ans-user-details">
            <div className="ans-timestamp">Posted on</div>
            <div className="ans-user-pfp">profile pic</div>
            <div className="ans-username">
              by username
            </div>
          </div>

          <div className="ans-crud-options">
            <button className="edit-button">edit</button>
            <button className="delete-button">delete</button>
=======
  dateCreated,
  reactions,
  user,
}) {
  const [editAnswer, setEditAnswer] = useState(false);
  const [answerDetail, setAnswerDetail] = useState("");
  const [answerUrl, setAnswerUrl] = useState("");

  //!set logic for user login

  return (
    <>
      <>
        <div className="ans-vote-container-REPLACE-LATER">
          <div className="vote-container">
            <div className="upvote-con">
              <div className="upvote-total">{getVotes(reactions).up_votes}</div>
              <div className="thumbs-up-button">
                <ThumbUpIcon></ThumbUpIcon>
              </div>
            </div>
            <div className="downvote-con">
              <div className="thumbs-down-button">
                <ThumbDownIcon></ThumbDownIcon>
              </div>
              <div className="downvote-total">
                {getVotes(reactions).down_votes}
              </div>
            </div>
>>>>>>> e6c8f871c4ba8e3399db55ea5472aa85c5ac0694
          </div>

          <div className="ans-container">
            <div className="ans-body-and-user-con">
              <div className="ans-detail-con">{answer?.answer} </div>

              <div className="ans-user-details">
                <div className="ans-timestamp">Posted on {dateCreated}</div>
                <div className="ans-user-pfp">profile pic</div>
                <div className="ans-username"> by {answer?.user?.username} </div>
              </div>
            </div>
            {answer?.user?.username === user?.username && (
              <div className="ans-crud-options">
                <button
                  className="edit-button"
                  onClick={() => {
                    setEditAnswer(true);
                  }}
                >
                  edit
                </button>
                <button className="delete-button">delete</button>
              </div>
            )}
          </div>
        </div>
<<<<<<< HEAD

      </div>
      <div className="title">answer author</div>
=======
      </>
>>>>>>> e6c8f871c4ba8e3399db55ea5472aa85c5ac0694
    </>
  );
}

export default IndividualAnswers;
