const MY_JWT_SECRET = "MY_JWT_SECRET";
import jwt from "jsonwebtoken";
import prisma from "../prisma/prismaDB";
import express, { Request, Response, NextFunction } from "express";
import logger from "morgan";
import responseTime from "response-time";
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(logger("dev"));
app.use(responseTime());

app.post("/rpc/:rpdMethodId", async (req: Request, res: Response) => {
  const { rpdMethodId } = req.params;
  switch (rpdMethodId) {
    case "sayHello": {
      const { name } = req.body;
      res.send(rpcMethods.sayHello(req.body));
      break;
    }
    case "getUserToken": {
      const { username, password } = req.body;
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

app.listen(PORT, () => {
  console.log("Running on port: " + PORT);
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
