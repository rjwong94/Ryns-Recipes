export interface NewRecipe {
  name: string;
  ingredients: number[];
  steps?: string[];
}

export interface Recipe extends NewRecipe { 
  id: number;
}

export interface newRecipeIngredient {
  ingredientId: number;
  amount?: number;
  unit?: string;
}
export interface RecipeIngredient extends newRecipeIngredient {
  recipeId: number;
}
