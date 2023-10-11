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
          returnType: "string"
        },
        getUserToken: {
          params: {
            username: "string",
            password: "string",
          },
          returnType: "string"
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
  });
  if (user) {
    token = jwt.sign({ username }, MY_JWT_SECRET, {
      expiresIn: "23h",
    });
  }
  return token;
}
