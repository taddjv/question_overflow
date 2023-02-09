import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect, useParams, useHistory } from "react-router-dom";
import { useUser } from "../../context/userContext";
import * as answerActions from "../../store/answer";
import * as reactionActions from "../../store/reaction";
import usersReducer, * as userActions from "../../store/user";
import { getVotes } from "../../helper/questionHelper";
import "./IndividualAnswer.css";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { Avatar } from "@mui/material";

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
  const [editAnswer, setEditAnswer] = useState(false);
  const [answerDetail, setAnswerDetail] = useState("");
  const [answerUrl, setAnswerUrl] = useState("");

  //!set logic for user login

  return (



    <div className="reply_container">
    <div className="answer_user_info">
      <Avatar/>
      <div className="ans-username">{answer?.user?.username} </div>
    </div>



    <div className="answer_and_vote">

      <div className="vote_container">

        <div className="upvotes">
          {getVotes(reactions).up_votes}
          <div className="up_icon">
            <i class="fa-solid fa-thumbs-up"/>
          </div>
          {/* end of upvote div */}
        </div>

        <div className='downvote'>
          {getVotes(reactions).down_votes}
          <div className="down_icon">
            <i class="fa-solid fa-thumbs-down"/>
          </div>
        </div>
        {/* end of downvote div */}
      </div>


      <div className="answer_container">

        <div className="answer">
          {answer?.answer}
        </div>

      </div>

    </div>
  {/* end of answer and vote div */}

  <p className="posted_date"><small>posted on: {dateCreated}</small></p>

  {answer?.user?.username === user?.username && (
                <div className="ans-crud-options">
                  <button
                    className="indivdual_edit_button"
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

  );



}

export default IndividualAnswers;
