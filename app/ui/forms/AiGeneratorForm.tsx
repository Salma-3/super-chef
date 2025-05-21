'use client'

import { useState } from 'react'
import { generateRecipe } from '@/app/lib/actions/generator';
import ArticleBody from '../ArticleBody';


function AiGeneratorForm() {
    const [mealType, setMealType] = useState('');
    const [allergies, setAllergies] = useState('');
    const [preferences, setPreferences] = useState('');
    const [recipe, setRecipe] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const generate = async () => {
        setIsLoading(true);
        setError('');
        setRecipe('');

        try {
            const text = await generateRecipe({ mealType, allergies, preferences})
            console.log(text)
            setRecipe(text);

            setIsLoading(false);
        } catch (error) {
            setIsLoading(false)
            setError('Something went wrong!')
        }

    }
  return (
    <div>
 <form>
        <div className="mb-3 text-start text-gray-500">
          <label htmlFor="mealType">Meal Type</label>
          <input id='mealType' type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" value={mealType} onChange={(e) => setMealType(e.target.value)} placeholder='e.g. Dinner, Breakfast' />
        </div>
        <div className="mb-3 text-start text-gray-500">
          <label htmlFor="allergies">Allergies</label>
          <input id='allergies' type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" value={allergies} onChange={(e) => setAllergies(e.target.value)} placeholder='e.g. Peanuts, Dairy' />
        </div>
        <div className="mb-3 text-start text-gray-500">
          <label htmlFor="preferences">Preferences</label>
          <input id='preferences' type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" value={preferences} onChange={(e) => setPreferences(e.target.value)} placeholder='e.g., Vegan, Low-carb, Keto' />
        </div>
        <button className='w-full bg-primary text-white rounded-md px-4 py-2 hover:bg-orange-800 transition-colors duration-200' type='button' onClick={generate} disabled={isLoading}>
            {
                isLoading ? 'Generating...' : <span>Generate Recipe <span className='ti ti-wand'></span></span>
            }
        </button>
    </form>
    <div className='p-4 border text-start my-5 rounded'>
       <ArticleBody src={recipe}/>
    </div>
    </div>
   
  )
}

export default AiGeneratorForm