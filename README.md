# PostagramApplSvc

## Prisma Studio

Prisma setup: https://www.traversymedia.com/blog/prisma-crash-course

Open Prisma GUI: npx prisma studio

## Run a typescript file

To run a typescript file: npx ts-node {fileName}.ts

## Migrate new schemas from Prisma

Migrate data: npx prisma migrate dev --name init

Sync data schemas from db: npx prisma db pull

## Application info

### Supported RPC Info

Info endpoint: /info

```json
{
  "build": {
    "name": "postagramapplsvc",
    "description": "This services acts as a middleware and rpc server for OchresSvc",
    "version": "1.0.0",
    "rpcMethods": {
      "sayHello": {
        "params": {
          "username": "string"
        },
        "returnType": "string"
      },
      "getUserToken": {
        "params": {
          "username": "string",
          "password": "string"
        },
        "returnType": "string"
      },
      "createPost": {
        "params": {
          "authorId": "number",
          "content": "string",
          "pictureUrls": "array<string>"
        },
        "returnType": "post"
      },
      "getUserInfo": {
        "params": {
          "username": "string"
        },
        "returnType": "user"
      },
      "addComment": {
        "params": {
          "userId": "number",
          "postId": "number",
          "content": "string"
        },
        "returnType": "comment"
      },
      "addReaction": {
        "params": {
          "userId": "number",
          "postId": "number",
          "reactionType": "string"
        },
        "returnType": "reaction"
      },
      "addFollowing": {
        "params": {
          "followerId": "number",
          "followeeId": "number"
        },
        "returnType": "following"
      },
      "getUserPosts": {
        "params": {
          "username": "string"
        },
        "returnType": "array<post>"
      },
      "getPostComments": {
        "params": {
          "postId": "number"
        },
        "returnType": "array<comment>"
      },
      "getFollowersList": {
        "params": {
          "username": "string"
        },
        "returnType": "array<follower>"
      },
      "getFollowingsList": {
        "params": {
          "username": "string"
        },
        "returnType": "array<followee>"
      },
      "getPost": {
        "params": {
          "postId": "number"
        },
        "returnType": "post"
      }
    }
  }
}
```
