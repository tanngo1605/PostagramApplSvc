const axios = require("axios");
const reactions = [
  {
    userId: 1,
    postId: 1,
    reactionType: "like",
  },
  {
    userId: 2,
    postId: 1,
    reactionType: "haha",
  },
  {
    userId: 3,
    postId: 1,
    reactionType: "wow",
  },
  {
    userId: 4,
    postId: 1,
    reactionType: "like",
  },
  {
    userId: 5,
    postId: 1,
    reactionType: "like",
  },
  {
    userId: 1,
    postId: 2,
    reactionType: "like",
  },
  {
    userId: 2,
    postId: 2,
    reactionType: "haha",
  },
  {
    userId: 3,
    postId: 2,
    reactionType: "wow",
  },
  {
    userId: 4,
    postId: 2,
    reactionType: "like",
  },
  {
    userId: 5,
    postId: 2,
    reactionType: "like",
  },
  {
    userId: 1,
    postId: 3,
    reactionType: "like",
  },
  {
    userId: 2,
    postId: 3,
    reactionType: "haha",
  },
  {
    userId: 3,
    postId: 3,
    reactionType: "wow",
  },
  {
    userId: 4,
    postId: 3,
    reactionType: "like",
  },
  {
    userId: 5,
    postId: 3,
    reactionType: "like",
  },
];

const reactions2 = [
  {
    userId: 5,
    postId: 3,
    reactionType: "like",
  },
];
reactions2.forEach((data) => {
  axios
    .post("http://localhost:3000/rpc/addReaction", {
      ...data,
    })
    .then((res) => {
      console.log("added: " + data);
    })
    .catch((err) => {
      console.log({ err });
    });
});
