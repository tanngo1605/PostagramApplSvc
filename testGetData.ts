import prisma from "./prisma/prismaDB";

async function main() {
  const usersWithPosts = await prisma.user.findMany({
    include: {
      Post: true,
      Reaction: true,
    },
    orderBy: {
      username: "asc",
    },
  });
  console.log({ usersWithPosts });

  const posts = await prisma.post.findMany({
    include: {
      author: true,
      Reaction: true,
    },
  });

  console.log({ posts });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
