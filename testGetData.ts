import prisma from "./prisma/prismaDB"

async function main() {
  const usersWithPosts = await prisma.user.findMany({
    include:{
      Post: true,
      Reaction: true
    },
    orderBy:{
      username: "asc"
    }
  })
  console.log(usersWithPosts)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })