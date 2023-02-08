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
