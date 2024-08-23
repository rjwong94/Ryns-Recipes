export interface NewRecipe {
  name: string;
  steps?: string[];
  ingredients?: RecipeIngredient[];
}

export interface Recipe extends NewRecipe { 
  id: number;
}

export interface RecipeIngredient {
  ingredientId: number;
  amount?: number;
  unit?: string;
}

