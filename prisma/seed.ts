const { PrismaClient } = require('@prisma/client');
const recipesData = require('../app/lib/placeholder-data.json')
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

const categories = ['dinner', 'breakfast', 'lunch', 'snacks', 'desserts', 'appetizers' ]

async function matchCategory(tags: string[]) {
  const index = categories.findIndex(cat => tags.includes(cat));

  if(index === -1) {
    return 1
  } else {
    const category = await prisma.category.findUnique({ where: { name: categories[index] }})
    return category.id
  }
} 


async function createUser() {
  const password = 'pass123';
  var hash = await bcrypt.hash(password, 8);
  const user1 = await prisma.user.upsert({
      where: { email: "alice@example.com" },
      update: {},
      create: {
          email: 'alice@example.com',
          username: 'Alice',
          password: hash
      }
  });

  console.log('Created user: %s', user1.email);
}

async function createCategories() {

  for(const cat of categories) {
    await prisma.category.create({
      data: { name: cat }
    })
  }

  console.log(`categories created`)
}


async function createRecipes() {
  const recipes = recipesData.map((rcp: any) =>
    ({
    name: rcp.name,
    description: rcp.description,
    slug: rcp.slug,
    tags: rcp.tags,
    image: rcp.image,
    instructions: rcp.instructions,
    ingredients: rcp.ingredients,
    servings: rcp.servings,
    time: rcp.time,
    calories: rcp.calories,
    authorId: 1,
    categoryId: 1
  }));

  await prisma.recipe.createMany({ data: recipes })
  return;
}


async function main() {
    await createUser()
    await createCategories()
    await createRecipes()
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })