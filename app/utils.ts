import { SORT_CRIT } from "./lib/definitions";

export type RecipeSearchParams = {
    page?: string;
    search?: string;
    categories?: string[] | string;
    tags?: string[] | string; 
}

export type SantisizedParams = {
    page: number;
    search: string;
    categories: number[];
    tags: string[] | null;

}

export function searchParamsSantizer(params: RecipeSearchParams): SantisizedParams{
  
    let initCats: string[] = [];
    let initTags: string[] | null = null;
    if(params.categories) {
        initCats = typeof params.categories === 'string' ? [params.categories] : params.categories;
    }

    if(params.tags) {
        initTags = typeof params.tags === 'string' ? [params.tags] : params.tags;
    }


    return {
        page : Number(params.page) || 1,
        search: params.search || '',
        categories: initCats.map(c => Number(c)),
        tags: initTags,
    }
}


export function buildRecipeQuery(params: SantisizedParams) {
    const OR = [];

    if(params.search) OR.push({ name: { contains: params.search, mode: 'insensitive' }})
    
    if(params.tags) OR.push( { tags: {hasSome: params.tags} })   
    
    if(params.categories.length > 0) OR.push({ categoryId: { in: params.categories }})

    const query = OR.length > 0 ? { OR } : {}

    console.dir(query, { depth: 5})

    return query;
}



export function isEmptyObject(obj: Object) {
    return Object.keys(obj).length === 0;
}


export function omitUndefined(obj: Object) {
    const result: any = {}
    for(const [key, val] of Object.entries(obj)) {
        if(val) {
            result[key] = val;
        }
    }

    return result;
}

export function slugify(str: string) {
    return str.toLowerCase().replaceAll(/[^a-zA-Z0-9]/g, '-').concat('-', String(Date.now()))
}


export function generatePrompt(
  mealType: string,
  allergies: string,
  preferences: string
) {
  return `
   You are an AI recipe generator. Your primary goal is to create a delicious, practical, and safe recipe based on the user's specific requirements.

User Requirements (provided to you by the user):

Meal Type: ${mealType || 'Any'} 

Allergies (if any): ${allergies || 'None'}

Dietary Preferences (if any): ${preferences || 'None'}

Based on the above user requirements, generate a recipe. Your output MUST ONLY contain the recipe content formatted with Markdown, exactly as follows (do not include any introductory or concluding text, or repeat the user requirements in your output):

**[A creative, descriptive, and appealing name for the dish]** \n
[A brief, appetizing description of the recipe, highlighting its key flavors and characteristics] \n

**Ingredients:**

[Ingredient 1 with precise quantity, e.g., "2 cups (250g) all-purpose flour"]

[Ingredient 2 with precise quantity]

... (List all ingredients required)

**Instructions:**

 [Step 1: Clear, concise action]

 [Step 2: Clear, concise action]

... (Provide numbered steps that are easy to follow, from preparation to serving)

**Prep Time:** [Estimated time for preparation, e.g., "15 minutes"] \n
**Cook Time:** [Estimated time for cooking, e.g., "30 minutes"] \n
**Servings:** [Number of people the recipe serves, e.g., "4"] \n
**Nutritional Information (Optional):** [If possible, provide estimated values for Calories, Protein, Carbohydrates, and Fat per serving. If not, state "Not available" or "Estimates not provided."] \n
`;

}