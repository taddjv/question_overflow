return (
    <>
      {question && question.user && answers && (
        <>
          <div className="ans-vote-container">

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


                <div className="vote-container">
                    <div className="upvote-con">
                    <div className="upvote-total"> upvote total here</div>
                    <div className="thumbs-up-button">upvote button</div>
                    </div>
                    <div className="downvote-con">
                    <div className="thumbs-down-button">downvote button</div>
                    <div className="downvote-total"> downvote total here</div>
                </div>
                </div>

                <div className="ans-container">
                <div className="ans-body-and-user-con">
                    <div className="ans-detail-con">{answer}  </div>

                    <div className="ans-user-details">
                    <div className="ans-timestamp">Posted on</div>
                    <div className="ans-user-pfp">profile pic</div>
                    <div className="ans-username"> by username </div>
                    </div>

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

          {/* entire container */}
         </div>
        </>
      )}
    </>
  );
