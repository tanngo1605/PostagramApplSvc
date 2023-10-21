const axios = require("axios");

const posts = [
  {
    userId: 3,
    postContent: "nesciunt iure omnis dolorem tempora et accusantium",
    pictureUrls: [
      "https://media.istockphoto.com/id/802775016/photo/glasses-concepts.jpg?s=612x612&w=0&k=20&c=FCmAuDsL9OljyyWFhCNl8-a87LkPkuW0DaZlrMZhEtA=",
    ],
  },
  {
    userId: 4,
    postContent: "provident vel ut sit ratione est",
    pictureUrls: [
      "https://media.istockphoto.com/id/802775016/photo/glasses-concepts.jpg?s=612x612&w=0&k=20&c=FCmAuDsL9OljyyWFhCNl8-a87LkPkuW0DaZlrMZhEtA=",
    ],
  },
  {
    userId: 5,
    postContent: "nesciunt iure omnis dolorem tempora et accusantium",
    pictureUrls: [
      "https://media.istockphoto.com/id/802775016/photo/glasses-concepts.jpg?s=612x612&w=0&k=20&c=FCmAuDsL9OljyyWFhCNl8-a87LkPkuW0DaZlrMZhEtA=",
    ],
  },
  {
    userId: 3,
    postContent: "provident vel ut sit ratione est",
    pictureUrls: [
      "https://media.istockphoto.com/id/802775016/photo/glasses-concepts.jpg?s=612x612&w=0&k=20&c=FCmAuDsL9OljyyWFhCNl8-a87LkPkuW0DaZlrMZhEtA=",
    ],
  },
  {
    userId: 4,
    postContent: "provident vel ut sit ratione est",
    pictureUrls: [
      "https://media.istockphoto.com/id/802775016/photo/glasses-concepts.jpg?s=612x612&w=0&k=20&c=FCmAuDsL9OljyyWFhCNl8-a87LkPkuW0DaZlrMZhEtA=",
    ],
  },
  {
    userId: 5,
    postContent: "provident vel ut sit ratione est",
    pictureUrls: [
      "https://media.istockphoto.com/id/802775016/photo/glasses-concepts.jpg?s=612x612&w=0&k=20&c=FCmAuDsL9OljyyWFhCNl8-a87LkPkuW0DaZlrMZhEtA=",
    ],
  },
  {
    userId: 3,
    postContent: "nesciunt iure omnis dolorem tempora et accusantium",
    pictureUrls: [
      "https://media.istockphoto.com/id/802775016/photo/glasses-concepts.jpg?s=612x612&w=0&k=20&c=FCmAuDsL9OljyyWFhCNl8-a87LkPkuW0DaZlrMZhEtA=",
    ],
  },
  {
    userId: 4,
    postContent: "provident vel ut sit ratione est",
    pictureUrls: [
      "https://media.istockphoto.com/id/802775016/photo/glasses-concepts.jpg?s=612x612&w=0&k=20&c=FCmAuDsL9OljyyWFhCNl8-a87LkPkuW0DaZlrMZhEtA=",
    ],
  },
  {
    userId: 5,
    postContent: "provident vel ut sit ratione est",
    pictureUrls: [
      "https://media.istockphoto.com/id/802775016/photo/glasses-concepts.jpg?s=612x612&w=0&k=20&c=FCmAuDsL9OljyyWFhCNl8-a87LkPkuW0DaZlrMZhEtA=",
    ],
  },
  {
    userId: 3,
    postContent: "nesciunt iure omnis dolorem tempora et accusantium",
    pictureUrls: [
      "https://media.istockphoto.com/id/802775016/photo/glasses-concepts.jpg?s=612x612&w=0&k=20&c=FCmAuDsL9OljyyWFhCNl8-a87LkPkuW0DaZlrMZhEtA=",
    ],
  },
  {
    userId: 4,
    postContent: "provident vel ut sit ratione est",
    pictureUrls: [
      "https://media.istockphoto.com/id/802775016/photo/glasses-concepts.jpg?s=612x612&w=0&k=20&c=FCmAuDsL9OljyyWFhCNl8-a87LkPkuW0DaZlrMZhEtA=",
    ],
  },
  {
    userId: 5,
    postContent: "provident vel ut sit ratione est",
    pictureUrls: [
      "https://media.istockphoto.com/id/802775016/photo/glasses-concepts.jpg?s=612x612&w=0&k=20&c=FCmAuDsL9OljyyWFhCNl8-a87LkPkuW0DaZlrMZhEtA=",
    ],
  },
];

posts.forEach((data) => {
  axios
    .post("http://localhost:3000/rpc/createPost", {
      ...data,
    })
    .then((res) => {
      console.log("added: " + data);
    });
});
