'use client'
import { CldImage, CldUploadWidget, CloudinaryUploadWidgetResults } from 'next-cloudinary'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import UploadWidget from './UploadWidget'
import ListInput from './ListInput'
import NutritionInput from './NutritionInput'
import { z } from 'zod'
import { createImageSchema, createNutritionSchema, createRecipeSchema } from '@/app/lib/validations'
import { Category } from '@prisma/client'
import { createRecipe, deleteImageFromDb, updateRecipe } from '@/app/lib/actions/recipes'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { RecipeWithCategoryAndAuthor } from '@/app/lib/definitions'

type Props = {
    categories: Category[];
    authorId: number;
    recipeData: RecipeWithCategoryAndAuthor | null
}


function RecipeForm({ categories, authorId, recipeData }: Props) {
    const [formData, setFormData] = useState<z.infer<typeof createRecipeSchema>>({
        name: recipeData?.name || '',
        description: recipeData?.description || '',
        categoryId: recipeData?.categoryId || 0,
        tags: recipeData?.tags || [],
        image: recipeData?.image || { url: '', publicId: '', height: 0, width: 0},
        servings: recipeData?.servings || 4,
        time: recipeData?.time || '',
        ingredients: recipeData?.ingredients || [],
        instructions: recipeData?.instructions || [],
        calories: recipeData?.calories || 0,
        nutrition: recipeData?.nutrition || [],
    })

    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const [errors, setErrors] = useState<{message: string, fieldErrors: any}>({message: '', fieldErrors: {}})
    
    const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {

        const { name, value } = e.target;
        let tmp: string | number = value
        
        if(name === 'categoryId' || name === 'calories' || name === 'servings') {
            tmp = Number(value)
        }
        setFormData({
            ...formData,
            [name]: tmp
        })
    }

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setLoading(true)

        console.log(formData)
        if(!recipeData) {
            const result = await createRecipe(formData, authorId);
            if(result.success) {
                return router.push(`/recipes/${result.recipe?.slug}`)
            }
    
            setErrors({ message: result.message || '', fieldErrors: result.errors })
            setLoading(false);
        } else {
            const result = await updateRecipe(recipeData.id, formData, authorId)
            if(result.success) {
                return router.push(`/recipes/${result.recipe?.slug}`)
            }
            setErrors({ message: result.message || '', fieldErrors: result.errors })
            setLoading(false);
        }
    }


    const handleUploadSuccess = (data: z.infer<typeof createImageSchema>) => {
        console.log(data)
        setFormData({ ...formData, image: data })
    }

    const handleList = (list: string[], name: string) => {
        setFormData({ ...formData, [name]: list })
    }

    const handleNutritionChange = (list: z.infer<typeof createNutritionSchema>) => {
        setFormData({ ...formData, nutrition: list })
    }


    const onDeleteImage = async () => {
        if(formData.image.publicId) {
            const result = await fetch('/api/delete-images', {
                method: 'POST',
                body: JSON.stringify({
                    publicId: formData.image.publicId,
                }),
                headers: { 'Content-Type': 'application/json' }
            })

            if(result.ok) { 
                setFormData({ ...formData, image: { url: '', publicId: '', height: 0, width: 0}})
            }
        }


        if(formData.image.id) {
           await deleteImageFromDb(formData.image.id)
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <p className="text-red-500">{errors.message}</p>
            {
               formData.image?.url && (
                <div className='group relative'>
                    <div className="hidden absolute inset-0 bg-black opacity-50 group-hover:block">
                    </div>
                    <button onClick={onDeleteImage} type="button" className='hidden group-hover:block absolute top-[40%] left-[45%] z-20 p-2 px-4 text-2xl bg-red-500 text-white hover:bg-red-700'>
                        <span className="ti ti-trash"></span>
                    </button>
                   <Image className='w-full h-full' src={formData.image.url} alt='uploaded' height={formData.image.height} width={formData.image.width}/>
                </div>
            )
            }
            <UploadWidget onSuccess={handleUploadSuccess}/>
            <div className="mb-4">
                <label htmlFor="name">Recipe name <span className="text-red-500">*</span></label>
                <input
                    type="text"
                    id='name'
                    name='name'
                    className='block border w-full px-2 py-1 rounded-lg focus:outline-none focus:border-primary'
                    value={formData.name}
                    onChange={onChange}
                />
                {
                   errors.fieldErrors && errors.fieldErrors['name'] && 
                       <small className="text-red-500">{errors.fieldErrors['name'].join(',')}</small>
                }
            </div>
            <div className="mb-4">
                <label htmlFor="desc">Description <span className="text-red-500">*</span></label>
                <textarea
                    id='desc'
                    name='description'
                    className='block border w-full px-2 py-1 rounded-lg focus:outline-none focus:border-primary'
                    value={formData.description}
                    onChange={onChange}
                    rows={7}
                ></textarea>
                 {
                   errors.fieldErrors && errors.fieldErrors['description'] && 
                       <small className="text-red-500">{errors.fieldErrors['description'].join(',')}</small>
                }
            </div>
            <div className="mb-4">
                <label htmlFor="category">Category <span className="text-red-500">*</span></label>
                <select
                    id='category'
                    name='categoryId'
                    className='block border w-full px-2 py-1 rounded-lg focus:outline-none focus:border-primary'
                    value={formData.categoryId}
                    onChange={onChange}
                >
                    <option value={0}>Select category</option>
                    {
                        categories.map(cat => (
                            <option key={cat.name} value={cat.id}>
                                {cat.name}
                            </option>
                        ))
                    }
                </select>
                {
                   errors.fieldErrors && errors.fieldErrors['categoryId'] && 
                       <small className="text-red-500">{errors.fieldErrors['categoryId'].join(',')}</small>
                }
            </div>
           

            <div className="mb-4">
                <label htmlFor="servings">Servings <span className="text-red-500">*</span></label>
                <input
                    type="number"
                    id='servings'
                    name='servings'
                    className='block border w-full px-2 py-1 rounded-lg focus:outline-none focus:border-primary'
                    value={formData.servings}
                    onChange={onChange}
                />
                 {
                   errors.fieldErrors && errors.fieldErrors['servings'] && 
                       <small className="text-red-500">{errors.fieldErrors['serrvings'].join(',')}</small>
                }
            </div>
            <div className="mb-4">
                <label htmlFor="time">Time <span className="text-red-500">*</span></label>
                <input
                    type="text"
                    id='time'
                    name='time'
                    className='block border w-full px-2 py-1 rounded-lg focus:outline-none focus:border-primary'
                    value={formData.time}
                    onChange={onChange}
                />
                <small className="text-gray-500">i. e. 30 min, 1 hr, 90 min</small>
                {
                   errors.fieldErrors && errors.fieldErrors['time'] && 
                       <small className="text-red-500">{errors.fieldErrors['time'].join(',')}</small>
                }
            </div>
            <div className="mb-4">
                <label htmlFor="calories">Calories <span className="text-red-500">*</span></label>
                <input
                    type="number"
                    id='calories'
                    name='calories'
                    className='block border w-full px-2 py-1 rounded-lg focus:outline-none focus:border-primary'
                    value={formData.calories}
                    onChange={onChange}
                />
                 {
                   errors.fieldErrors && errors.fieldErrors['calories'] && 
                       <small className="text-red-500">{errors.fieldErrors['calories'].join(',')}</small>
                }
            </div>
            {/* list input for ingredients and instructions */}
            <ListInput initValue={formData.ingredients} name='ingredients' label='Ingredients' handleChange={handleList}/>

            {
                errors.fieldErrors && errors.fieldErrors['ingredients'] && 
                    <small className="text-red-500">{errors.fieldErrors['ingredients'].join(',')}</small>
            }

            <ListInput initValue={formData.instructions} name='instructions' label='Instructions' handleChange={handleList}/>
            {
                errors.fieldErrors && errors.fieldErrors['instructions'] && 
                    <small className="text-red-500">{errors.fieldErrors['instructions'].join(',')}</small>
            }
            
            <ListInput initValue={formData.tags} name='tags' label='Tags' handleChange={handleList}/>

            {
                errors.fieldErrors && errors.fieldErrors['tags'] && 
                    <small className="text-red-500">{errors.fieldErrors['tags'].join(',')}</small>
            }


            {/* list input for nutrition */}
            <NutritionInput initValue={formData.nutrition} handleChange={handleNutritionChange}/>

            {
                errors.fieldErrors && errors.fieldErrors['nutrition'] && 
                    <small className="text-red-500">{errors.fieldErrors['nutrition'].join(',')}</small>
            }

            <button disabled={loading} type="submit" className="my-3 w-full px-3 py-1 bg-primary text-white rounded-lg hover:bg-darkorange disabled:bg-primary/50">
                {loading ? 'Posting...' : 'Post New Recipe'}
            </button>
        </form>
    )
}

export default RecipeForm