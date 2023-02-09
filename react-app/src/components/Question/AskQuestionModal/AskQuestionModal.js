import React, { useState} from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as questionActions from "../../../store/question";

const AskQuestionForm = ({ setShowModal }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [question, setQuestion] = useState("");
  const [detail, setDetail] = useState("");
  const [url, setUrl] = useState("");

  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    dispatch(
      questionActions.postTheQuestion({
        question,
        detail,
        url,
      })
    )
      .then(() => history.push("/"))
      .then(() => setShowModal(false))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.error) setErrors(data.errors);
      });
  };

  return (
    <form className="ask-question-form" onSubmit={handleSubmit}>
      <div className="form-container">
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
      </div>
      <div className="ask-question-elements">
        <label>
          Question
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
        </label>
        <label>
          Detail
          <input
            type="text"
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
            required
          />
        </label>
        <label>
          Profile-URL
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </label>

        <div className="post-btn-section">
          <button className="post-button" type="submit">
            Post Question
          </button>
        </div>
      </div>
    </form>
  );
};

export default AskQuestionForm;
