import { z } from 'zod'

export const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'password should be at least 6 characters').max(50, 'password cannot be longer than 50 characters')
})


export const createUserSchema = z.object({
    username: z.string().trim().min(5, 'Username should be 5 - 20 characters').max(20, 'username should be 5 - 20 characters'),
    email: z.string().trim().email('Invalid email'),
    password: z.string().min(6, 'password should be 6 - 50 characters').max(50, 'password should be 6 - 50 characters')
})

export const updateUserSchema = z.object({
    facebook: z.string().url().optional(),    
    twitter: z.string().url().optional(),
    instagram: z.string().url().optional(),
    pintrest: z.string().url().optional()

})

export const createImageSchema = z.object({
    id: z.number().optional(),
    url: z.string().url(),
    height: z.number(),
    width: z.number(),
    publicId: z.string().min(1, 'invalid public id')
})

export const createNutritionSchema = z.object({
    id: z.number().optional(),
    name: z.string().trim().min(1, 'invalid nutrition name'),
    value: z.string().trim().min(1, 'invalid nutrition value')
}).array().min(1, 'include nutrition info')

export const createRecipeSchema = z.object({
    name: z.string().trim().min(5, 'Invalid recipe name').max(100, 'Too long name'),
    description: z.string().min(20, 'too short description').trim(),
    categoryId: z.number().min(1, 'you have to select category'),
    tags: z.string().trim().array().min(1, 'you should include at least one tag'),
    image: createImageSchema,
    servings: z.number().min(1, 'invalid servings value'),
    time: z.string().trim().min(1, 'invalid time value'),
    ingredients: z.string().trim().array().min(1, 'You should include at least on ingredient'),
    instructions: z.string().trim().array().min(1, 'you should include at least on instruction'),
    calories: z.number().min(1, 'Invalid calories value'),
    nutrition: createNutritionSchema
})


export const createReviewSchema = z.object({
    rate: z.number().min(1, 'invalid rate').max(5, 'invalid rate'),
    body: z.string().trim().optional(),
    recipeId: z.number(),
    authorId: z.number()
})


export const createArticleSchema = z.object({
    title: z.string().min(5, 'Too short title').max(100, 'Too long title').trim(),
    body: z.string().min(5, 'Too short for body').trim(),
    authorId: z.number(),
})


export const createCommentSchema = z.object({
    body: z.string().min(1, 'comment cannot be empty'),
    authorId: z.number(),
    articleId: z.number(),
});