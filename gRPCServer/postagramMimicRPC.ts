const MY_JWT_SECRET = "MY_JWT_SECRET";
import jwt from "jsonwebtoken";
import prisma from "../prisma/prismaDB";
import express, { Request, Response, NextFunction } from "express";
import logger from "morgan";
import responseTime from "response-time";
import actuator from "express-actuator";
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(logger("dev"));
app.use(responseTime());
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

async function getUserInfo(username: string) {
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
