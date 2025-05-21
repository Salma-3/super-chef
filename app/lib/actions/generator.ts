'use server';
import { generatePrompt } from "@/app/utils";
import { generateText } from "ai";
import { google } from "@ai-sdk/google";
 

export async function generateRecipe(data: {
  mealType: string;
  allergies: string;
  preferences: string;
}) {
  const { mealType, allergies, preferences } = data;
  
  const { text  } = await generateText({
    prompt: generatePrompt(mealType, allergies, preferences),
    model: google('gemini-2.0-flash-001'),
  })

  return text;
}