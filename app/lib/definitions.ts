import { Prisma } from "@prisma/client";

const recipeWithCategory = Prisma.validator<Prisma.RecipeDefaultArgs>()({
    include: { category: true }
})

const recipeWithCategoryAndAuthor = Prisma.validator<Prisma.RecipeDefaultArgs>()({
    include: { 
        category: true, 
        author: true, 
        nutrition: true 
    }
})

export type RecipeWithCategory = Prisma.RecipeGetPayload<typeof recipeWithCategory>;

export type RecipeWithCategoryAndAuthor = Prisma.RecipeGetPayload<typeof recipeWithCategoryAndAuthor>;
