import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as userActions from "../../store/user";

function IndividualQuestion({
  questionTitle,
  detail,
  url,
  dateCreated,
  user_id,
}) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.usersReducer);

  useEffect(() => {
    dispatch(userActions.getTheUser(user_id));
  }, []);

  const userContent = user.user ? user.user.username : null;

  return (
    //!add new route to answers to count the answers per question
    <div>
      <div className="question-title">
        <div className="q-t-title">
          {questionTitle}
          {detail}
        </div>
        <div className="q-t-answers"># Answers</div>
        <div className="q-t-author">{userContent}</div>
        <div className="q-t-latest-answer">Latest Answer</div>
      </div>
    </div>
  );
}

export default IndividualQuestion;
