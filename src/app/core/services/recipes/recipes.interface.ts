export interface Recipe {
  id: number;
  name: string;
  ingredients: number[];
  steps?: string[];
}

export interface RecipeIngredient {
  recipeId: number;
  ingredientId: number;
  amount?: number;
  unit?: string;
}
