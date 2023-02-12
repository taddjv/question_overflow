import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as questionActions from "../../../store/question";
import "./AskQuestionModal.css";

const AskQuestionForm = ({ setShowModal, user }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [question, setQuestion] = useState("");
  const [detail, setDetail] = useState("");
  const [url, setUrl] = useState("");

  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    if (!question) {
      return setErrors(["Please enter a question"]);
    }

    dispatch(
      questionActions.postTheQuestion({
        question,
        detail,
        url,
        user,
      })
    ).then(async (res) => {
      const data = await res;
      if (data.errors) {
        const newErrors = res.errors.map((ele) => {
          if (ele.includes("url")) {
            return ele.slice(ele.indexOf(":") + 2);
          }
          return (
            ele.slice(0, ele.indexOf(":")) + ele.slice(ele.indexOf(":") + 7)
          );
        });
        setErrors(newErrors);
      } else {
        history.push("/");
        setShowModal(false);
      }
    });
  };

  return (
    <div className="askQuestionBody">
      <form className="ask-question-form" onSubmit={handleSubmit}>
        <div className="askQuestion_logo">
          <h1 className="askQuestion_ask">Ask</h1>
          <h1 className="askQuestion_question">
            <em>_Question</em>
          </h1>
        </div>
        <div className="form-container">
          <ul className="modal-error">
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
        </div>

        <div className="ask-question-elements">
          <label>
            <div className="askQuestion_ele">Question</div>
            <input
              className="input_ele"
              type="text"
              size="30"
              placeholder="Question..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </label>

          <label>
            <div className="askQuestion_ele">Question Detail</div>
            <input
              className="input_ele"
              placeholder="Detail..."
              type="text"
              size="30"
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
            />
          </label>

          <label>
            <div className="askQuestion_ele">Image-URL</div>
            <input
              className="input_ele"
              size="30"
              type="text"
              placeholder="Add an image..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </label>

          <div className="post-btn-section">
            <button className="post-button" type="submit">
              Post Question
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AskQuestionForm;
