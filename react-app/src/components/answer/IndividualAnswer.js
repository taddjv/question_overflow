import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect, useParams, useHistory } from "react-router-dom";
import { useUser } from "../../context/userContext";
import * as answerActions from "../../store/answer";
import * as sessionActions from "../../store/session";
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
  dateCreated,
  reactions,
  user,
}) {
  const dispatch = useDispatch();

  const [editAnswer, setEditAnswer] = useState(false);
  const [answerDetail, setAnswerDetail] = useState("");
  const [answerUrl, setAnswerUrl] = useState("");

  const editTheAnswer = (e) => {
    e.preventDefault();
    const editedAnswer = {
      answer: answerDetail,
    };
    dispatch(answerActions.putTheAnswer(editedAnswer, id, question_id))
      .then(() => {
        setAnswerDetail("");
        setEditAnswer(false);
      })
      .catch(() => {
        console.log("not working");
      });
  };

  return (
    <>
      {editAnswer ? (
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
          </div>

          <div className="ans-container">
            <div className="ans-body-and-user-con">
              <div className="ans-detail-con">
                <input
                  className={null}
                  type="text"
                  value={answerDetail || answer.answer}
                  onChange={(e) => {
                    setAnswerDetail(e.target.value);
                  }}
                ></input>
              </div>

              <div className="ans-user-details">
                <div className="ans-timestamp">Posted on {dateCreated}</div>
                <div className="ans-user-pfp">profile pic</div>
                <div className="ans-username"> by {answer.user.username} </div>
              </div>
            </div>
            {answer.user.username === user.username && (
              <form onSubmit={editTheAnswer} className="ans-crud-options">
                <button
                  className="edit-button"
                  onClick={() => {
                    setEditAnswer(false);
                  }}
                >
                  cancel
                </button>
                <button className="delete-button">Apply changes</button>
              </form>
            )}
          </div>
        </div>
      ) : (
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
          </div>

          <div className="ans-container">
            <div className="ans-body-and-user-con">
              <div className="ans-detail-con">{answer.answer} </div>

              <div className="ans-user-details">
                <div className="ans-timestamp">Posted on {dateCreated}</div>
                <div className="ans-user-pfp">profile pic</div>
                <div className="ans-username"> by {answer.user.username} </div>
              </div>
            </div>
            {answer.user.username === user.username && (
              <div className="ans-crud-options">
                <button
                  className="edit-button"
                  onClick={() => {
                    setEditAnswer(true);
                  }}
                >
                  edit
                </button>
                <button
                  className="delete-button"
                  onClick={() => {
                    dispatch(
                      answerActions.deleteTheAnswer(id, question_id)
                    ).then(() => {
                      setAnswerDetail("");
                      setEditAnswer(false);
                    });
                    // .then(() => {
                    //   console.log(" it worked");
                    // })
                    // .catch(async (res) => {
                    //   console.log("unauthorized bro");
                    // });
                  }}
                >
                  delete
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default IndividualAnswers;
