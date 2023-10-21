const axios = require("axios");

async function createFollowings() {
  for (let i = 150; i < 301; i++) {
    await axios.post("http://localhost:3000/rpc/addFollowing", {
      followerId: 2,
      followeeId: i,
    });
    console.log("following added");
  }
}

createFollowings();
