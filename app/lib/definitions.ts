import { Prisma } from "@prisma/client";

const recipeWithCategory = Prisma.validator<Prisma.RecipeDefaultArgs>()({
    include: { category: true, image: true }
})

const recipeWithCategoryAndAuthor = Prisma.validator<Prisma.RecipeDefaultArgs>()({
    include: { 
        category: true, 
        author: true, 
        nutrition: true ,
        image: true,
    }
})


const reviewWithAuthor = Prisma.validator<Prisma.ReviewDefaultArgs>()({
    include: {
        author: true
    }
})

export type RecipeWithCategory = Prisma.RecipeGetPayload<typeof recipeWithCategory>;

export type RecipeWithCategoryAndAuthor = Prisma.RecipeGetPayload<typeof recipeWithCategoryAndAuthor>;

export type ReviewWithAuthor = Prisma.ReviewGetPayload<typeof reviewWithAuthor>;


export type AuthErrorCode = 'InvalidCreds'

export class AuthError extends Error {
    msg: string;
    code: AuthErrorCode
    
    constructor(message: string, code: AuthErrorCode){
        super(message);
        this.msg = message;
        this.code = code;

        Object.setPrototypeOf(this, AuthError)
    }
}