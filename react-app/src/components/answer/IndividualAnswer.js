import * as answerActions from "../../store/answer";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as reactionActions from "../../store/reaction";
import { getVotes, userVotes } from "../../helper/questionHelper";
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
  // const [answerUrl, setAnswerUrl] = useState("");
  const [errors, setErrors] = useState([]);
  const [tempUpVote, setTempUpVote] = useState(0);
  const [tempDownVote, setTempDownVote] = useState(0);
  const [userUpvote, setUserUpvote] = useState(false);
  const [userDownvote, setUserDownvote] = useState(false);

  const reactionUsers = useSelector((state) => state?.reactionsReducer);

  useEffect(() => {
    if (user) {
      dispatch(reactionActions.getTheUpvotes(id)).then(async (res) => {});
      dispatch(reactionActions.getTheDownvotes(id)).then(async (res) => {});
    }
  }, []);

  const votes = user ? userVotes(reactionUsers, id, user.id) : null;
  const upVoted = (votes) => {
    if (votes) {
      let dataVoted = false;
      if (votes.up === 1) {
        dataVoted = true;
      }
      if (dataVoted && !tempUpVote) {
        return "thumbs-up-button-icon-green";
      } else if (dataVoted && tempUpVote) {
        return null;
      } else if (!dataVoted && !tempUpVote) {
        return null;
      } else if (!dataVoted && tempUpVote) {
        return "thumbs-up-button-icon-green";
      }
    }
  };
  const downVoted = (votes) => {
    if (votes) {
      let dataVoted = false;
      if (votes.down === 1) {
        dataVoted = true;
      }
      if (dataVoted && tempDownVote) {
        return null;
      } else if (dataVoted && !tempDownVote) {
        return "thumbs-up-button-icon-red";
      } else if (!dataVoted && tempDownVote) {
        return "thumbs-up-button-icon-red";
      } else if (!dataVoted && !tempDownVote) {
        return null;
      }
    }
  };


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

  const handleUpvote = (e) => {
    e.preventDefault();
    if (user) {
      dispatch(reactionActions.postTheUpvote(id)).then(async (res) => {
        const data = await res;

        if (data.message.includes("added")) {
          setTempUpVote(tempUpVote + 1);
          setUserUpvote(true);
        } else if (data.message.includes("deleted")) {
          setTempUpVote(tempUpVote - 1);
          setUserUpvote(false);
        } else if (data.message === "upVoted") {
          setTempDownVote(tempDownVote - 1);
          setTempUpVote(tempUpVote + 1);
          setUserUpvote(true);
          setUserDownvote(false);
        }
      });
    } else {
      alert("Please login to vote");
    }
  };

  const handleDownvote = (e) => {
    e.preventDefault();
    if (user) {
      dispatch(reactionActions.postTheDownvote(id)).then(async (res) => {
        const data = await res;

        if (data.message.includes("added")) {
          setTempDownVote(tempDownVote + 1);
          setUserDownvote(true);
        } else if (data.message.includes("deleted")) {
          setTempDownVote(tempDownVote - 1);
          setUserDownvote(false);
        } else if (data.message === "downVoted") {
          setTempDownVote(tempDownVote + 1);
          setTempUpVote(tempUpVote - 1);
          setUserUpvote(true);
          setUserDownvote(true);
          setUserUpvote(false);
        }
      });
    }
  };

  return (
    <>
      {editAnswer ? (
        <div className="ans-vote-container-REPLACE-LATER">
          <div className="a-v-c-profile">
            <Avatar src={answer.user.profile_url} />
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
                  <ThumbUpIcon onClick={handleUpvote}></ThumbUpIcon>
                </div>
                <div className="upvote-total">
                  <div>{getVotes(reactions).up_votes + tempUpVote}</div>
                </div>
              </div>
              <div className="downvote-con">
                <div className="thumbs-down-button">
                  <ThumbDownIcon onClick={handleDownvote}></ThumbDownIcon>
                </div>
                <div className="downvote-total">
                  <div>{getVotes(reactions).down_votes + tempDownVote}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="ans-vote-container-REPLACE-LATER">
          <div className="a-v-c-profile">
            <Avatar src={answer.user.profile_url} />
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
              {answer.user?.username === user?.username && (
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
                <div className={`thumbs-up-button `}>
                  <ThumbUpIcon
                    className={`thumbs-up-button-icon ${upVoted(votes)} `}
                    onClick={handleUpvote}
                  ></ThumbUpIcon>
                </div>
                <div className="upvote-total">
                  <div>{getVotes(reactions).up_votes + tempUpVote}</div>
                </div>
              </div>
              <div className="downvote-con">
                <div className="thumbs-down-button">
                  <ThumbDownIcon
                    className={`thumbs-up-button-icon ${
                      downVoted(votes)
                    }
                    `}
                    onClick={handleDownvote}
                  ></ThumbDownIcon>
                </div>
                <div className="downvote-total">
                  <div>{getVotes(reactions).down_votes + tempDownVote}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default IndividualAnswers;
