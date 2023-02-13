// import IndividualAnswer from "../components/answer/IndividualAnswer";
import IndividualQuestion from "../components/Question/IndividualQuestion";

export const getVotes = (reactionArray) => {
  let upVotes = 0;
  let downVotes = 0;

  reactionArray.forEach((ele) => {
    if (ele.up_vote) {
      upVotes++;
    }
    if (ele.down_vote) {
      downVotes++;
    }
  });
  return {
    up_votes: upVotes,
    down_votes: downVotes,
  };
};

// const renderAnswers = (answerObj) => {
//   const answers = [];
//   for (let answer in answerObj) {
//     answers.push(
//       <IndividualAnswer
//         id={answerObj[answer].id}
//         answer={answerObj[answer]}
//         question_id={answerObj[answer].question_id}
//         user_id={answerObj[answer].user_id}
//         url={answerObj[answer].url}
//         dateCreated={answerObj[answer].dateCreated}
//         reactions={answerObj[answer].reactions}
//         user={user}
//       />
//     );
//   }
//   return answers;
// };

export const renderQuestions = (questionObj) => {
  const questions = [];

  for (let question in questionObj) {
    questions.push(
      <IndividualQuestion
        id={questionObj[question].id}
        questionTitle={questionObj[question].question}
        detail={questionObj[question].detail}
        url={questionObj[question].url}
        dateCreated={questionObj[question].dateCreated}
        user={questionObj[question].user}
        questionId={questionObj[question].id}
        answers={questionObj[question].answers}
      />
    );
  }
  return questions;
};

export const userVotes = (answerVotes, id, user_id) => {
  let upvotes = 0;
  let downvotes = 0;
  for (let vote in answerVotes) {
    if (vote.includes("Up") && vote.includes(id.toString())) {
      const reactions = answerVotes[vote].reactions;
      reactions?.forEach((ele) => {
        if (ele?.user_id == user_id) {
          upvotes++;
        }
      });
    }
    if (vote.includes("Down") && vote.includes(id.toString())) {
      const reactions = answerVotes[vote].reactions;
      reactions?.forEach((ele) => {
        if (ele?.user_id == user_id) {
          downvotes++;
        }
      });
    }
  }
  return { up: upvotes, down: downvotes };
};
