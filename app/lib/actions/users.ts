'use server'
import { createUserSchema, updateUserSchema } from "@/app/lib/validations"
import { z } from "zod"
import prisma from "@/app/lib/db"
import bcrypt from 'bcryptjs'
import gravatar from 'gravatar';

export const createUser = async (data: z.infer<typeof createUserSchema>) => {
    try {
        const parsed = createUserSchema.safeParse(data);

        if(!parsed.success) {
            return {
                success: false,
                errors: parsed.error?.flatten().fieldErrors,
            }
        }

        const user = await prisma.user.findUnique({ where: { email: parsed.data.email }})
        if(user) {
            throw new Error('This email has been used before')
        }
        
        const avatar = gravatar.url(parsed.data.email, {s: '100', r: 'x', d: 'retro'}, true);
        const hash = bcrypt.hashSync(parsed.data.password, 8);
        const newUser = await prisma.user.create({
            data: { 
                ...parsed.data, 
                password: hash,
                avatar,
            }
        });
    

        return {
            success: true,
            user: newUser
        }
    } catch (error) {
        const err = error as Error
        console.error('error')
    
        return { success: false, message: err.message }
    }
}


export const updateUserProfile = async (data: z.infer<typeof updateUserSchema>, userId: number) => {
    try {
        const parsed = updateUserSchema.safeParse(data)

        if(!parsed.success) {
            return {
                success: false,
                errors: parsed.error.flatten().fieldErrors
            }
        }

        const result = await prisma.user.update({ 
            where: { id: userId },
            data: {
                ...parsed.data
            }
         });

         return {
            success: true,
            user: result
         }
    } catch (error) {
        const err = error as Error
        return {
            success: false,
            message: err.message
        }
    }
}