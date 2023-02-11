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
  const dispatch = useDispatch();

  const [editAnswer, setEditAnswer] = useState(false);
  const [answerDetail, setAnswerDetail] = useState("");
  const [answerUrl, setAnswerUrl] = useState("");
  const [errors, setErrors] = useState([]);

  const editTheAnswer = (e) => {
    e.preventDefault();
    const editedAnswer = {
      answer: answerDetail,
    };
    dispatch(answerActions.putTheAnswer(editedAnswer, id, question_id)).then(
      async (res) => {
        const data = await res;

        if (data.errors) {
          const newErrors = res.errors.map((ele) => {
            return (
              ele.slice(0, ele.indexOf(":")) + ele.slice(ele.indexOf(":") + 7)
            );
          });
          setErrors(newErrors);
        } else {
          setAnswerDetail("");
          setEditAnswer(false);
        }
      }
    );
  };
  return (
    <>
      {editAnswer ? (
        <div className="ans-vote-container-REPLACE-LATER">
          <div className="a-v-c-profile">
            <img src={user.profile_url} />
          </div>
          <div className="a-v-c-content">
            <div className="ans-container">
              <div className="ans-body-and-user-con">
                <div className="ans-user-details">
                  <div className="ans-username">by {answer.user.username} </div>
                  <div className="ans-timestamp">Posted on {dateCreated}</div>
                </div>
                <div className="ans-detail-con">
                  <input
                    className={null}
                    type="text"
                    value={answerDetail}
                    onChange={(e) => {
                      setAnswerDetail(e.target.value);
                    }}
                  ></input>
                </div>
                <ul className="answer-error">
                  {errors.map((ele) => (
                    <li>{ele}</li>
                  ))}
                </ul>
              </div>
              {answer.user.username === user.username && (
                <form onSubmit={editTheAnswer} className="ans-crud-options">
                  <button
                    className="edit-button"
                    onClick={() => {
                      setEditAnswer(false);
                      setErrors([]);
                    }}
                  >
                    cancel
                  </button>
                  <button className="delete-button">Apply changes</button>
                </form>
              )}
            </div>
            <div className="vote-container">
              <div className="upvote-con">
                <div className="thumbs-up-button">
                  <ThumbUpIcon></ThumbUpIcon>
                </div>
                <div className="upvote-total">
                  <div>{getVotes(reactions).up_votes}</div>
                </div>
              </div>
              <div className="downvote-con">
                <div className="thumbs-down-button">
                  <ThumbDownIcon></ThumbDownIcon>
                </div>
                <div className="downvote-total">
                  <div>{getVotes(reactions).down_votes}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="ans-vote-container-REPLACE-LATER">
          <div className="a-v-c-profile">
            <img src={user.profile_url} />
          </div>
          <div className="a-v-c-content">
            <div className="ans-container">
              <div className="ans-body-and-user-con">
                <div className="ans-user-details">
                  <div className="ans-username">by {answer.user.username}</div>
                  <div className="ans-timestamp">Posted on {dateCreated}</div>
                </div>
                <div className="ans-detail-con">{answer.answer} </div>
              </div>
              {answer.user.username === user.username && (
                <div className="ans-crud-options">
                  <button
                    className="edit-button"
                    onClick={() => {
                      setEditAnswer(true);
                      setAnswerDetail(answer.answer);
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
                        setAnswerDetail("g");
                        // setEditAnswer(false);
                      });
                    }}
                  >
                    delete
                  </button>
                </div>
              )}
            </div>
            <div className="vote-container">
              <div className="upvote-con">
                <div className="thumbs-up-button">
                  <ThumbUpIcon></ThumbUpIcon>
                </div>
                <div className="upvote-total">
                  <div>{getVotes(reactions).up_votes}</div>
                </div>
              </div>
              <div className="downvote-con">
                <div className="thumbs-down-button">
                  <ThumbDownIcon></ThumbDownIcon>
                </div>
                <div className="downvote-total">
                  <div>{getVotes(reactions).down_votes}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );

  // return (
  //   <div className="reply_container">
  //     <div className="answer_user_info">
  //       <Avatar />
  //       <div className="ans-username">{answer?.user?.username} </div>
  //     </div>

  //     <div className="answer_and_vote">
  //       <div className="vote_container">
  //         <div className="upvotes">
  //           {getVotes(reactions).up_votes}
  //           <div className="up_icon">
  //             <i class="fa-solid fa-thumbs-up" />
  //           </div>
  //           {/* end of upvote div */}
  //         </div>

  //         <div className="downvote">
  //           {getVotes(reactions).down_votes}
  //           <div className="down_icon">
  //             <i class="fa-solid fa-thumbs-down" />
  //           </div>
  //         </div>
  //         {/* end of downvote div */}
  //       </div>

  //       <div className="answer_container">
  //         <div className="answer">{answer?.answer}</div>
  //       </div>
  //     </div>
  //     {/* end of answer and vote div */}

  //     <p className="posted_date">
  //       <small>posted on: {dateCreated}</small>
  //     </p>

  //     {answer?.user?.username === user?.username && (
  //       <div className="ans-crud-options">
  //         <button
  //           className="indivdual_edit_button"
  //           onClick={() => {
  //             setEditAnswer(true);
  //           }}
  //         >
  //           edit
  //         </button>
  //         <button className="delete-button">delete</button>
  //       </div>
  //     )}
  //   </div>
  // );
}

export default IndividualAnswers;
