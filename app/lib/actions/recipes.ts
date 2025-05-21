'use server'

import prisma from "@/app/lib/db";
import { z } from "zod";
import {  createRecipeSchema } from "../validations";
import axios from 'axios'

export const createImage = async (data: { url: string; publicId: string; height: number; width: number;  }) => {
    try {
        const newImage = await prisma.image.create({
            data
        })

        return newImage;
    } catch (error) {
        
    }
}

export const createRecipe = async (data: z.infer<typeof createRecipeSchema>, authorId: number) => {
    try {
        console.log('authorId', authorId)
        const parsed = createRecipeSchema.safeParse(data);

        if(!parsed.success) {
            return {
                success: false,
                errors: parsed.error.flatten().fieldErrors
            }
        }

        const image = await prisma.image.create({
            data: data.image
        })

        const recipe = await prisma.recipe.create({
           data: {
            name: data.name,
            description: data.description,
            categoryId: data.categoryId,
            calories: data.calories,
            servings: data.servings,
            time: data.time,
            ingredients: data.ingredients,
            instructions: data.instructions,
            tags: data.tags,
            slug: data.name.toLowerCase().split(' ').join('-') + Date.now(),
            imageId: image.id,
            nutrition: {
                createMany: {
                    data: data.nutrition
                },
            },
            authorId,
           },
        });

        return {success: true, recipe };
    } catch (error) {
        console.error(error)
        return {
            success: false,
            message: (error as Error).message
        }
    }
}


export const deleteNutrition = async (id: number) => {
    try {
        const result = await prisma.nutrition.delete({ where: { id }})
        console.log(result);
        return true;
    } catch (error) {
        console.log(error)
        return false;
    }
}


export const updateRecipe = async (recipeId: number, data: z.infer<typeof createRecipeSchema>, authorId: number) => {
    try {
        console.log('authorId', authorId)
        const parsed = createRecipeSchema.safeParse(data);

        if(!parsed.success) {
            return {
                success: false,
                errors: parsed.error.flatten().fieldErrors
            }
        }

        const image = !data.image.id ? await prisma.image.create({
            data: data.image
        }) : data.image

        const newNutritions = data.nutrition.filter(ntr => !!!ntr.id)
        console.log('newNutritions')

        const recipe = await prisma.recipe.update({
           where: { id: recipeId },
           data: {
            name: data.name,
            description: data.description,
            categoryId: data.categoryId,
            calories: data.calories,
            servings: data.servings,
            time: data.time,
            ingredients: data.ingredients,
            instructions: data.instructions,
            tags: data.tags,
            slug: data.name.toLowerCase().split(' ').join('-') + '-' + Date.now(),
            imageId: image.id,
            nutrition: newNutritions.length > 0 ? {
                createMany: {
                    data: newNutritions
                },
            } : undefined,
            authorId,
           },
        });

        return {success: true, recipe };
    } catch (error) {
        console.error(error)
        return {
            success: false,
            message: (error as Error).message
        }
    }
}


export const deleteImageFromDb = async (id: number) => {
    try {
        const result = await prisma.image.delete({ where: { id }})
        console.log(result)
        return true;
    } catch (error) {
        console.log(error)
        return false;
    }
}


export const deleteRecipe = async (id: number, imageId: number) => {
    try {
        const image = await prisma.image.findFirst({ where: { id: imageId }});

        if(!image) throw new Error('Image Not Found');

        const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

        await axios.post(`${baseURL}/api/delete-images`, JSON.stringify({ publicId: image.publicId }), { headers: { "Content-Type": 'application/json' }})

        await prisma.recipe.delete({ where: { id }})

        await deleteImageFromDb(imageId);

    } catch (error) {
        console.log(error)
        return false;
    }
}

export const favorite = async (recipeId: number, userId: number) => {
    try {
        const result = await prisma.favoriteRecipe.create({
           data: {
            recipeId,
            userId
           }
        })

        console.log(result)
        return true;
    } catch (error) {
        console.log('Error while favoriting recipe:', error)
        return false;
    }
}


export const unfavorite = async (recipeId: number, userId: number) => {
    try {
        const result = await prisma.favoriteRecipe.deleteMany({
            where: {
                recipeId,
                userId
            }
        });
        
       console.log(result)
       return true;
    } catch (error) {
        console.log(error)
        return false;
    }
}