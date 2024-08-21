import { Recipe, RecipeIngredient } from "./recipes.interface";

export const RECIPES: Recipe[] = [
  {
    id: 0, name: 'Red Sauce',
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
    steps: [
      'Combine 1/4 cup of soy sauce, 1/4 cup of mirin, 1/4 cup of sake, and 1/4 cup of sugar in a small saucepan over medium heat.',
      'Once the sugar has dissolved, remove from heat and set aside.',
      'In a medium saucepan, combine 1 cup of dashi and the sauce mixture over medium heat.',
      'Add 1/2 cup of sliced onions and cook until softened.',
      'Add 1 cup of sliced chicken thighs and cook until no longer pink.',
      'Add 2 beaten eggs and cook until the eggs are set.',
      'Serve over a bowl of rice and garnish with sliced green onions.'
    ]
  }
];

export const RECIPEINGREDIENTS: RecipeIngredient[] = [
  {recipeId: 0, ingredientId: 2, amount: 3, unit: 'cloves'},
  {recipeId: 0, ingredientId: 3, amount: 1, unit: 'large'},
  {recipeId: 0, ingredientId: 4, amount: 4, unit: 'tbsp'},
  {recipeId: 1, ingredientId: 0, amount: 1, },
  {recipeId: 1, ingredientId: 3, amount: 1/4, },
];