import { Recipe, RecipeIngredient } from "./recipes.interface";

export const RECIPES: Recipe[] = [
  {
    id: 0, name: 'Red Sauce',
    ingredients: [2, 3, 4],
    steps: [
      'Sautee garlic in 1/4 cup oil over medium in a pot or sauce pan.',
      'Add red pepper flakes and dried oregano.',
      'Once fragrant, add onions and cook until softened.',
      'Add 2 tbsp of tomato paste and cook until combined with onions.',
      'Add tomatoes and combine while crushing tomatoes with wooden spoon. Optionally, roughly blend the sauce with an immersion blender at the end for a smoother texture.',
      'Add basil, slightly cover the pot, and simmer the sauce for an hour on low whilst stirring occassionally.',
      'Remove the sauce from the heat, remove the basil, and stir in 2 tbsp of unsalted butter until melted and combined. Season with salt and pepper to taste.'
    ],
  },
  {
    id: 1, name: 'Oyakodon',
    ingredients: [0],
  }
];

export const RECIPEINGREDIENTS: RecipeIngredient[] = [
  {recipeId: 0, ingredientId: 2, amount: 3, unit: 'cloves'},
  {recipeId: 0, ingredientId: 3, amount: 1, unit: 'large'},
  {recipeId: 0, ingredientId: 4, amount: 4, unit: 'tbsp'},
  {recipeId: 1, ingredientId: 0, amount: 2, unit: 'thighs'},
];