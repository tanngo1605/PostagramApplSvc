const displayNames = [
  "Clementina DuBuque",
  "Glenna Reichert",
  "Leanne Graham",
  "Ervin Howell",
  "Clementine Bauch",
  "Patricia Lebsack",
  "Chelsey Dietrich",
  "Robert Cox",
  "Audrey Garcia",
  "Katherine Powell",
  "Jasmine Gary",
  "Brianna Hughes",
  "Amber Moore",
  "Rebecca Nelson",
  "Alexander Torres",
  "Sophia Miller",
  "Liam Johnson",
  "Olivia Brown",
  "Noah Davis",
  "Emma Wilson",
  "Ava Martinez",
  "Isabella Anderson",
  "Mia Thomas",
  "Lucas Thompson",
  "Ella Jackson",
  "Amelia White",
  "Harper Taylor",
  "Ethan Lee",
  "Madison Harris",
  "Aiden Clark",
  "Emily Lewis",
  "Benjamin Walker",
  "Abigail Young",
  "William Hall",
  "Charlotte Allen",
];

const avatarUrls = [
  "https://xsgames.co/randomusers/assets/avatars/male/15.jpg",
  "https://xsgames.co/randomusers/assets/avatars/male/73.jpg",
  "https://xsgames.co/randomusers/assets/avatars/male/37.jpg",
  "https://xsgames.co/randomusers/assets/avatars/male/75.jpg",
  "https://xsgames.co/randomusers/assets/avatars/male/66.jpg",
  "https://xsgames.co/randomusers/assets/avatars/male/10.jpg",
  "https://xsgames.co/randomusers/assets/avatars/female/77.jpg",
  "https://xsgames.co/randomusers/assets/avatars/female/76.jpg",
  "https://xsgames.co/randomusers/assets/avatars/female/40.jpg",
  "https://xsgames.co/randomusers/assets/avatars/female/72.jpg",
  "https://xsgames.co/randomusers/assets/avatars/female/61.jpg",
  "https://xsgames.co/randomusers/assets/avatars/female/9.jpg",
];

const axios = require("axios");

async function addUsers() {
  const displayNamesL = displayNames.length;
  const avatarUrlsL = avatarUrls.length;
  for (let i = 0; i < 100; i++) {
    const displayNameIdx = getRandomNumber(0, displayNamesL - 1);
    const avatarUrlIdx = getRandomNumber(0, avatarUrlsL - 1);
    const isVerifiedIdx = getRandomNumber(0, 1);

    await axios.post("http://localhost:3000/rpc/createUser", {
      username: "neymar_" + i,
      displayName: displayNames[displayNameIdx],
      userPassword: "123456",
      avatarUrl: avatarUrls[avatarUrlIdx],
      isVerified: isVerifiedIdx === 0 ? false : true,
    });
    console.info("user added");
  }
}
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//addUsers();
