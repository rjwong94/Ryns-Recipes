import { Ingredient } from "./ingredients.interface";

export const INGREDIENTS: Ingredient[] = [
  {id: 0, name: 'Chicken Thigh', category: 'Meats, Poultry, and Seafood', categoryID: 0, subcatagory: 'Poultry', unit: ['lbs','g']},
  {id: 1, name: 'Chicken Breast', category: 'Meats, Poultry, and Seafood', categoryID: 0, subcatagory: 'Poultry', unit: ['lbs','g']},
  {id: 2, name: 'Garlic', category: 'Vegetables', categoryID: 1, unit: ['cloves','g']},
  {id: 3, name: 'Yellow Onion', category: 'Vegetables',  categoryID: 1},
  {id: 4, name: 'Unsalted Butter', category: 'Dairy', categoryID: 2, unit: ['Tbsp','g']}
];
