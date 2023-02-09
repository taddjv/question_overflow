import React, { useEffect } from "react";
import IndividualQuestion from "../Question/IndividualQuestion";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as searchesActions from "../../store/search";
// import "./Question.css";

function Search() {
  const { searchQuery } = useParams();
  const dispatch = useDispatch();
  const allSearches = useSelector((state) => state.searchReducer);

  useEffect(() => {
    dispatch(searchesActions.getTheSearch(searchQuery)).then(() => {});
  }, [dispatch, searchQuery]);

  const content =
    allSearches && allSearches.searches && allSearches.searches.questions.length
      ? allSearches.searches.questions.map((ele, i) => {
          return (
            <IndividualQuestion
              id={ele.id}
              questionTitle={ele.question}
              detail={ele.detail}
              url={ele.url}
              dateCreated={ele.dateCreated}
              user={ele.user}
              questionId={ele.id}
              answers={ele.answers}
            />
          );
        })
      : null;

  return (
    content && (
      <div className="question-container">
        <div className="question-title">
          <div></div>
          <div className="q-t-title">Questions</div>
          <div className="q-t-answers">Answers</div>
          <div className="q-t-author">Author</div>
          <div className="q-t-latest-answer">Latest Answer</div>
        </div>
        <div className="question-body">{content}</div>
      </div>
    )
  );
}

export default Search;
