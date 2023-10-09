const PROTO_PATH = __dirname + "/postagram.proto";
const jwt = require("jsonwebtoken");
const MY_JWT_SECRET = "MY_JWT_SECRET";
const PORT = process.env.PORT || 3000;
const os = require("os");
const networkInterfaces = os.networkInterfaces();
import prisma from "../prisma/prismaDB";

const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const postagram_rpc_server =
  grpc.loadPackageDefinition(packageDefinition).postagram_rpc;

/**
 * Implements the SayHello RPC method.
 */
function sayHello(call: any, callback: any) {
  callback(null, { message: "Hello " + call.request.name });
}

async function getUserToken(call: any, callback: any) {
  console.log(`request received`)
  const { username, password } = call.request;
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
  callback(null, {
    token,
  });
}

let serverIpAddress: string;

// Loop through network interfaces to find a suitable IP address.
Object.keys(networkInterfaces).forEach((ifname) => {
  networkInterfaces[ifname].forEach((iface: any) => {
    if (iface.family === "IPv4" && !iface.internal) {
      serverIpAddress = iface.address;
    }
  });
});

/**
 * Starts an RPC server that receives requests for the Greeter service at the
 * sample server port
 */
function main() {
  const bindAddr = `0.0.0.0:${PORT}`;
  const server = new grpc.Server();
  server.addService(postagram_rpc_server.Postagram.service, {
    sayHello: sayHello,
    getUserToken: getUserToken,
  });
  server.bindAsync(bindAddr, grpc.ServerCredentials.createInsecure(), () => {
    console.info(`Run at bindAddress: ${bindAddr}`);
    server.start();
  });
}

main();
