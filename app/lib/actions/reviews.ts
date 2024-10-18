'use server'

import { z } from "zod";
import { createReviewSchema } from "@/app/lib/validations";
import prisma from "@/app/lib/db";
import { revalidatePath } from "next/cache";
import { redirect, RedirectType } from "next/navigation";

export async function createReview(data: z.infer<typeof createReviewSchema>, slug: string) {
    try {
        const parsed = createReviewSchema.safeParse(data);

        if(!parsed.success) {
            return {
                success: false,
                errors: parsed.error.flatten().fieldErrors
            }
        }

        const hasReviewed = await prisma.review.findFirst({ 
            where: {
                authorId: data.authorId,
                recipeId: data.recipeId
            }
        })

        if(hasReviewed) {
            throw new Error('You cannot review the same recipe more than once.')
        }

        const result = await prisma.review.create({ data, include: { author: true} })

        const avgSummery = await prisma.review.aggregate({
            where: { recipeId: data.recipeId },
            _avg: {
                rate: true,
            },
        })


        await prisma.recipe.update({
            where: { id: data.recipeId },
            data: {
                rate: avgSummery._avg.rate || 0
            }
        });

        revalidatePath(`/recipes/${slug}`)

        return {
            success: true,
            review: result
        }
        
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: (error as Error).message
        }
    }

}