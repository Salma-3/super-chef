'use server';
import { z } from "zod";
import { createArticleSchema, createCommentSchema, createImageSchema } from "@/app/lib/validations";
import prisma from "@/app/lib/db";
import { revalidatePath } from "next/cache";
import axios from "axios";
import { slugify } from "@/app/utils";



export const createArticle = async (data: z.infer<typeof createArticleSchema>, imageData: z.infer<typeof createImageSchema>) => {
    try {
        const parsed = createArticleSchema.safeParse(data);
        
        if(!parsed.success) {
            return {
                errors: parsed.error.flatten().fieldErrors,
                success: parsed.success,
            }
        } 


        const image = await prisma.image.create({
            // @ts-ignore
            data: {
                publicId: imageData.publicId,
                url: imageData.url,
                width: imageData.width,
                height: imageData.height,
                article: {
                    create: {
                        ...data,
                        slug: slugify(data.title)
                    }
                }
            },
            include: { article: true }
        });

        return {
            success: true,
            article: image.article,
        };
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: (error as Error).message,
        }
    }
}


export const updateArticle = async (id: number, data: z.infer<typeof createArticleSchema>, imageData: z.infer<typeof createImageSchema>) => {
    try {
        const parsed = createArticleSchema.safeParse(data);
        
        if(!parsed.success) {
            return {
                errors: parsed.error.flatten().fieldErrors,
                success: parsed.success,
            }
        } 

       
        const image = !imageData.id ? await prisma.image.create({
            // @ts-ignore
            data: {
                publicId: imageData.publicId,
                url: imageData.url,
                width: imageData.width,
                height: imageData.height,
            },
        }) : imageData;

        const article = await prisma.article.update({
            where: { id },
            data: {
                title: data.title,
                body: data.body,
                imageId: image.id,
                authorId: data.authorId,
                slug: slugify(data.title)
            }
        })
        console.log(article)

        return {
            success: true,
            article: article,
        };
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: (error as Error).message,
        }
    }
}


export const deleteArticle = async (articleId: number, userId: number) => {
    try {
        const article = await prisma.article.findUnique({ where: { id: articleId, authorId: userId }, include: { image: true }});
        
        if(!article) {
            return {
                success: false,
                message: 'Article Not Found'
            }
        }

        const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/delete-images`, JSON.stringify({ publicId: article.image?.publicId }))

        await prisma.article.delete({ where: { id: articleId }});

        return {
            success: true
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: (error as Error).message
        }
    }
}

export const createComment = async (data: z.infer<typeof createCommentSchema>) => {
    try {
        const parsed = createCommentSchema.safeParse(data)

        if(!parsed.success) {
            return {
                success: parsed.success,
                errors: parsed.error.flatten().fieldErrors,
            }
        }
        const comment = await prisma.comment.create({
            data,
            include: { article: true }
        });

        revalidatePath(`/blog/${comment.article.slug}`)

        return {
            success: false,
            comment,
        };
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: (error as Error).message
        }
    }
}

export const deleteComment = async (commentId: number, authorId: number) => {
    try {
        const cmt = await prisma.comment.findUnique({ where: { id: commentId }, include: { article: true }});
        if(cmt?.authorId !==  authorId) {
            return {
                success: false,
                message: 'Authorization denied!'
            }
        }

        await prisma.comment.delete({ where: { id: commentId }})

        revalidatePath(`/blog/${cmt.article.slug}`);

        return {
            success: true
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: (error as Error).message
        }
    }
}