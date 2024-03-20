import { Injectable } from '@angular/core';
import { Recipe } from './recipes';
import { INGREDIENTS } from './stored-ingredients';

@Injectable({
  providedIn: 'root'
})
export class GetRecipeService {
  protected recipeList: Recipe[] = [
    {
      id: 1, name: 'Red Sauce',
      ingredients: [2,3,4],
      amount: [3, 2, 4],
      unit: ['cloves', '', 'tbsp'],
      steps: [
        'Sautee garlic in 1/4 cup oil over medium in a pot or sauce pan.',
        'Add red pepper flakes and dried oregano.',
        'Once fragrant, add onions and cook until softened.',
        'Add 2 tbsp of tomato paste and cook until combined with onions.',
        'Add tomatoes and combine while crushing tomatoes with wooden spoon. Optionally, roughly blend the sauce with an immersion blender at the end for a smoother texture.',
        'Add basil, slightly cover the pot, and simmer the sauce for an hour on low whilst stirring occassionally.',
        'Remove the sauce from the heat, remove the basil, and stir in 2 tbsp of unsalted butter until melted and combined. Season with salt and pepper to taste.'
      ]
    },
    {
      id: 2, name: 'Oyakodon',
      ingredients: [0],
      amount: [1],
      unit: ['lbs']
    }
  ];

  constructor() { }

  getAllRecipes() {
    return this.recipeList;
  }

  getRecipeByID(id: number): Recipe | undefined {
    return this.recipeList.find(recipe => recipe.id === id);
  }
}
