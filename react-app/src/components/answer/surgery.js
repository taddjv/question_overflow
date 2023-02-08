return (
    <>
      {question && question.user && answers && (
        <>
         <div className="question-and-answers-body">
         {editQuestion ? (
              <form
                className="individual-question-container-edit"
                onSubmit={editSubmit}
              >
                  <div className="username-timestamp">
                    <div className="ind-ques-username">
                      {question.user.username} asks
                    </div>
                    <div className="ind-ques-timestamp">
                      Posted on {question.dateCreated}
                    </div>
                  </div>

                  <div className="ques-input-con">
                  <input
                    className="edit-ques-title"
                    type="text"
                    value={questionTitle || question.question}
                    onChange={(e) => {
                      setQuestionTitle(e.target.value);
                    }}
                  ></input>
                  <textarea
                    className="edit-ques-body"
                    type="text"
                    value={questionDetail || question.detail}
                    onChange={(e) => {
                      setQuestionDetail(e.target.value);
                    }}
                    rows={3}
                    cols={5}
                  />
                  <input
                    className="edit-ques-url"
                    type="text"
                    value={questionUrl || question.url}
                    onChange={(e) => {
                      setQuestionUrl(e.target.value);
                    }}
                  ></input>
                  </div>
                  <div className="ques-edit-crud-buttons">
                <div className="edit-button">
                  <span
                    className="edit-button"
                    onClick={() => {
                      setEditQuestion(false);
                    }}
                  >
                    <button className="cancel-button">cancel</button>
                  </span>
                </div>
                {/* the submit button has tbe outside of the div. It needs to be a direct child of form */}
                <button className="edit-submit" type="submit">
                  Apply Changes
                </button>
                </div>
              </form>

          ) : (
            <>
              <div className="individual-question-container">
                <div className="user-timestamp-question-con">
                  <div className="username-timestamp">
                    <div className="ind-ques-username">
                      {question.user.username} asks
                    </div>
                    <div className="ind-ques-timestamp">
                      Posted on {question.dateCreated}
                    </div>
                  </div>

                  <div className="ind-ques-title">{question.question}</div>
                  <div className="ind-ques-body">{question.detail}</div>
                  <div className="ind-ques-image">Optional image goes here</div>
                </div>

                <div className="ind-ques-cruds">
                  <button
                    className="edit-button"
                    onClick={() => {
                      setEditQuestion(true);
                    }}
                  >
                    edit
                  </button>

                  <button
                    className="delete-button"
                    onClick={() => {
                      dispatch(questionActions.deleteTheQuestion(id))
                        .then(() => {
                          console.log("worked");
                        })
                        .catch(async (res) => {
                          console.log("unauthorized bro");
                        });
                    }}
                  >
                    delete
                  </button>
                </div>
              </div>
            </>
          )}

          <div className="all-answer-container">
            <div className="individual-answer">
              <div className="replies-banner">replies</div>

              {answers
                ? answers.answers.map((ele, i) => {
                    return (
                      <>
                        <IndividualAnswer
                          id={ele.id}
                          answer={ele.answer}
                          question_id={ele.question_id}
                          user_id={ele.user_id}
                          url={ele.url}
                          dateCreated={ele.dateCreated}
                        />
                      </>
                    );
                  })
                : null}
            </div>
          </div>
         </div>
        </>
      )}
    </>
  );
