const MY_JWT_SECRET = "MY_JWT_SECRET";
import jwt from "jsonwebtoken";
import prisma from "../prisma/prismaDB";
import express, { Request, Response, NextFunction } from "express";
import logger from "morgan";
import actuator from "express-actuator";
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(logger("dev"));
app.use(
  actuator({
    infoGitMode: "full",
    infoBuildOptions: {
      rpcMethods: {
        sayHello: {
          params: {
            username: "string",
          },
          returnType: "string",
        },
        getUserToken: {
          params: {
            username: "string",
            password: "string",
          },
          returnType: "string",
        },
        createPost: {
          params: {
            authorId: "number",
            content: "string",
            pictureUrls: "array<string>",
          },
          returnType: "post",
        },
        getUserInfo: {
          params: {
            username: "string",
          },
          returnType: "user",
        },
        addComment: {
          params: {
            userId: "number",
            postId: "number",
            content: "string",
          },
          returnType: "comment",
        },
        addReaction: {
          params: {
            userId: "number",
            postId: "number",
            reactionType: "string",
          },
          returnType: "reaction",
        },
        addFollowing: {
          params: {
            followerId: "number",
            followeeId: "number",
          },
          returnType: "following",
        },
        getUserPosts: {
          params: {
            username: "string",
          },
          returnType: "array<post>",
        },
        getPostComments: {
          params: {
            postId: "number",
          },
          returnType: "array<comment>",
        },
        getFollowersList: {
          params: {
            username: "string",
          },
          returnType: "array<follower>",
        },
        getFollowingsList: {
          params: {
            username: "string",
          },
          returnType: "array<followee>",
        },
        getPost: {
          params: {
            postId: "number",
          },
          returnType: "post",
        },
      },
    },
  })
);

app.post("/rpc/:rpcMethodId", async (req: Request, res: Response) => {
  const { rpcMethodId } = req.params;
  switch (rpcMethodId) {
    case "sayHello": {
      res.send(rpcMethods.sayHello(req.body));
      break;
    }
    case "getUserToken": {
      const token = await rpcMethods.getUserToken(req.body);
      res.status(200).json({
        result: token,
      });
      break;
    }
    case "createPost": {
      const post = await rpcMethods.createPost(req.body);
      res.status(200).json({
        result: post,
      });
      break;
    }
    case "getUserInfo": {
      const user = await rpcMethods.getUserInfo(req.body);
      res.status(200).json({
        result: user,
      });
      break;
    }
    case "addComment": {
      const comment = await rpcMethods.addComment(req.body);
      res.status(200).json({
        result: comment,
      });
      break;
    }
    case "addReaction": {
      const reaction = await rpcMethods.addReaction(req.body);
      res.status(200).json({
        result: reaction,
      });
      break;
    }
    case "addFollowing": {
      const following = await rpcMethods.addFollowing(req.body);
      res.status(200).json({
        result: following,
      });
      break;
    }
    case "getUserPosts": {
      const posts = await rpcMethods.getUserPosts(req.body);
      res.status(200).json({
        result: posts,
      });
      break;
    }
    case "getPostComments": {
      const comments = await rpcMethods.getPostComments(req.body);
      res.status(200).json({
        result: comments,
      });
      break;
    }
    case "getFollowersList": {
      const followersList = await rpcMethods.getFollowersList(req.body);
      res.status(200).json({
        result: followersList,
      });
      break;
    }
    case "getFollowingsList": {
      const followeesList = await rpcMethods.getFollowingsList(req.body);
      res.status(200).json({
        result: followeesList,
      });
      break;
    }
    case "getPost": {
      const post = await rpcMethods.getPost(req.body);
      res.status(200).json({
        result: post,
      });
      break;
    }
  }
});

app.get("/rpc/all", (req: Request, res: Response) => {
  res.send(Object.keys(rpcMethods));
});

const runningServer = app.listen(PORT, () => {
  console.log("Running on port: " + PORT);
});

process.on("SIGTERM", () => {
  runningServer.close(async () => {
    await prisma.$disconnect();
    console.log("server stopped.");
  });
});

const rpcMethods = {
  sayHello,
  getUserToken,
  createPost,
  getUserInfo,
  addComment,
  addReaction,
  addFollowing,
  getUserPosts,
  getPostComments,
  getFollowersList,
  getFollowingsList,
  getPost,
};

function sayHello({ username }: { username: string }): string {
  return "Hello " + username;
}

async function getUserToken({
  username,
  password,
}: {
  username: string;
  password: string;
}): Promise<string> {
  let token: string = "";
  const user = await prisma.user.findFirst({
    where: {
      username: username,
      userPassword: password,
    },
    select: {
      id: true,
      username: true,
      displayName: true,
      avatarUrl: true,
      isVerified: true,
    },
  });
  if (user) {
    token = jwt.sign({ ...user }, MY_JWT_SECRET, {
      expiresIn: "23h",
    });
  }
  return token;
}

async function createPost({
  userId,
  postContent,
  pictureUrls,
}: {
  userId: number;
  postContent: string;
  pictureUrls: string[];
}) {
  return await prisma.post.create({
    data: {
      authorId: userId,
      content: postContent,
      pictureUrls: pictureUrls,
    },
  });
}

async function getUserInfo({ username }: { username: string }) {
  return await prisma.user.findFirst({
    where: {
      username: username,
    },
    select: {
      id: true,
      username: true,
      displayName: true,
      avatarUrl: true,
      isVerified: true,
      _count: {
        select: {
          followers: true,
          followings: true,
        },
      },
    },
  });
}
async function addComment({
  userId,
  postId,
  content,
}: {
  userId: number;
  postId: number;
  content: string;
}) {
  return await prisma.comment.create({
    data: {
      userId: userId,
      postId: postId,
      content: content,
    },
  });
}

async function addReaction({
  userId,
  postId,
  reactionType,
}: {
  userId: number;
  postId: number;
  reactionType: string;
}) {
  return await prisma.reaction.create({
    data: {
      userId: userId,
      postId: postId,
      reactionType: reactionType,
    },
  });
}

async function addFollowing({
  followerId,
  followeeId,
}: {
  followerId: number;
  followeeId: number;
}) {
  return await prisma.following.create({
    data: {
      followerId: followerId,
      followeeId: followeeId,
    },
  });
}

async function getUserPosts({ username }: { username: string }) {
  return await prisma.post.findMany({
    where: {
      author: {
        username: username,
      },
    },
  });
}

async function getPostComments({ postId }: { postId: number }) {
  return await prisma.comment.findMany({
    where: {
      postId: postId,
    },
    select: {
      content: true,
      createAt: true,
      user: {
        select: {
          username: true,
          avatarUrl: true,
          isVerified: true,
        },
      },
    },
  });
}

async function getFollowersList({ username }: { username: string }) {
  return await prisma.following.findMany({
    where: {
      followee: {
        username: username,
      },
    },
    select: {
      follower: {
        select: {
          username: true,
          avatarUrl: true,
        },
      },
    },
  });
}

async function getFollowingsList({ username }: { username: string }) {
  return await prisma.following.findMany({
    where: {
      follower: {
        username: username,
      },
    },
    select: {
      followee: {
        select: {
          username: true,
          avatarUrl: true,
        },
      },
    },
  });
}

async function getPost({ postId }: { postId: number }) {
  return await prisma.post.findFirst({
    where: {
      id: postId,
    },
    select: {
      author: {
        select: {
          username: true,
          avatarUrl: true,
          isVerified: true,
        },
      },
      content: true,
      id: true,
      createAt: true,
      pictureUrls: true,
      _count: {
        select: {
          reactions: true,
          comments: true,
        },
      },
    },
  });
}
