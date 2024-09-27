import { PrismaClient } from '@prisma/client';
import recipesData from '../app/lib/placeholder-data.json';
import { faker } from '@faker-js/faker';

import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const categories = ['dinner', 'breakfast', 'lunch', 'snacks', 'desserts', 'appetizers' ]


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

async function createReviews(){
  const reviews = Array.from({ length: 100 }, (_, index) => ({
    rate: faker.number.int({ min: 1, max: 5 }),
    body: faker.lorem.sentences(3),
    authorId: 1,
    recipeId: [1, 2, 3,4,5,6,7,8,9,10,11,12,13,14, 15].at(index % 14)!
  }));

  const result = await prisma.review.createMany({
    data: reviews
  });

  console.log(result)
}

async function updateRecipesRate() {
  const recipes = await prisma.recipe.findMany()
  for(let i=0; i<recipes.length; i++){
    const reviews = await prisma.review.findMany({ where: { recipe: {id: recipes[i].id }}})
    if(reviews.length < 1) continue;
    const totalRates = reviews.reduce((prev, curr) => prev + curr.rate, 0)
    const avgRate = parseFloat((totalRates / reviews.length).toFixed(1))
    console.log(totalRates, avgRate)
    await prisma.recipe.update({ 
      where: { id: recipes[i].id }, 
      data: { rate: avgRate }
    })

  }
}


async function main() {
    // await createUser()
    // await createCategories()
    // await createRecipes()
    // await createReviews()
    await updateRecipesRate()
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })