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