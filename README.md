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
    }
  }
}
```
