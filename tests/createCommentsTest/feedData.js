const comments = [
  {
    userId: 1,
    postId: 2,
    content: "ipsum odio harum voluptatem sunt cumque et ",
  },
  {
    userId: 1,
    postId: 3,
    content: "ipsum odio harum voluptatem sunt cumque et ",
  },
  {
    userId: 1,
    postId: 1,
    content: "ipsum odio harum voluptatem sunt cumque et ",
  },
  {
    userId: 1,
    postId: 1,
    content: "ipsum odio harum voluptatem sunt cumque et ",
  },
  {
    userId: 1,
    postId: 2,
    content: "ipsum odio harum voluptatem sunt cumque et ",
  },
  {
    userId: 1,
    postId: 21,
    content: "ndoloremque illo ex atque necessitatibus sed",
  },
  {
    userId: 1,
    postId: 12,
    content: "ndoloremque illo ex atque necessitatibus sed",
  },
  {
    userId: 12,
    postId: 32,
    content: "ndoloremque illo ex atque necessitatibus sed",
  },
  {
    userId: 1,
    postId: 31,
    content: "ndoloremque illo ex atque necessitatibus sed",
  },
  {
    userId: 1,
    postId: 31,
    content: "ndoloremque illo ex atque necessitatibus sed",
  },
  {
    userId: 1,
    postId: 14,
    content: "ndoloremque illo ex atque necessitatibus sed",
  },
  {
    userId: 1,
    postId: 14,
    content: "ndoloremque illo ex atque necessitatibus sed",
  },
  {
    userId: 1,
    postId: 15,
    content: "ndoloremque illo ex atque necessitatibus sed",
  },
  {
    userId: 1,
    postId: 16,
    content: "nnumquam dignissimos aliquid ut reprehenderit voluptatibus",
  },
  {
    userId: 1,
    postId: 17,
    content: "nnumquam dignissimos aliquid ut reprehenderit voluptatibus",
  },
  {
    userId: 1,
    postId: 18,
    content: "nnumquam dignissimos aliquid ut reprehenderit voluptatibus",
  },
  {
    userId: 1,
    postId: 19,
    content: "nnumquam dignissimos aliquid ut reprehenderit voluptatibus",
  },
  {
    userId: 1,
    postId: 20,
    content: "nnumquam dignissimos aliquid ut reprehenderit voluptatibus",
  },
  {
    userId: 2,
    postId: 1,
    content: "nnumquam dignissimos aliquid ut reprehenderit voluptatibus",
  },
  {
    userId: 2,
    postId: 1,
    content: "nnumquam dignissimos aliquid ut reprehenderit voluptatibus",
  },
  {
    userId: 2,
    postId: 1,
    content: "nnumquam dignissimos aliquid ut reprehenderit voluptatibus",
  },
  {
    userId: 2,
    postId: 5,
    content: "beatae ut ad quisquam sed repellendus et",
  },
  {
    userId: 2,
    postId: 5,
    content: "beatae ut ad quisquam sed repellendus et",
  },
  {
    userId: 2,
    postId: 7,
    content: "beatae ut ad quisquam sed repellendus et",
  },
  {
    userId: 1,
    postId: 7,
    content: "beatae ut ad quisquam sed repellendus et",
  },
];
const comments2 = [
  {
    userId: 5,
    postId: 2,
    content: "nnumquam dignissimos aliquid ut reprehenderit voluptatibus",
  },
  {
    userId: 5,
    postId: 3,
    content: "nnumquam dignissimos aliquid ut reprehenderit voluptatibus",
  },
  {
    userId: 5,
    postId: 4,
    content: "nnumquam dignissimos aliquid ut reprehenderit voluptatibus",
  },
  {
    userId: 3,
    postId: 2,
    content: "nnumquam dignissimos aliquid ut reprehenderit voluptatibus",
  },
  {
    userId: 4,
    postId: 3,
    content: "nnumquam dignissimos aliquid ut reprehenderit voluptatibus",
  },
  {
    userId: 4,
    postId: 4,
    content: "nnumquam dignissimos aliquid ut reprehenderit voluptatibus",
  },
];
const axios = require("axios");

comments.forEach((data, idx) => {
  axios
    .post("http://localhost:3000/rpc/addComment", {
      ...data,
    })
    .then((res) => {
      console.log("added: " + data);
    })
    .catch((e) => {
      console.log("failed at idx: " + idx);
    });
});
