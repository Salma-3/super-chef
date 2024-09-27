import prisma from '@/app/lib/db'


export async function fetchRecipes({ page, limit }: { page?: number, limit?: number}){
    try {
        const p = page || 1;
        const take = limit || 5;
        const skip = (p-1) * take;
        const recipes = await prisma.recipe.findMany({ take, skip })
        console.log('recipes', recipes)
        return recipes;
    } catch (error) {
        console.log(error)
    } 
}