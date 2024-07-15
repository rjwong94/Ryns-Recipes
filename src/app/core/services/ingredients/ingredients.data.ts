import { Category, Ingredient, SubCategory } from "./ingredients.interface";

export const INGREDIENTS: Ingredient[] = [
  {id: 0, name: 'Chicken Thigh', categoryID: 0, subcategoryID: 2},
  {id: 1, name: 'Chicken Breast', categoryID: 0, subcategoryID: 2},
  {id: 2, name: 'Garlic', categoryID: 1, subcategoryID: 6},
  {id: 3, name: 'Yellow Onion', categoryID: 1, subcategoryID: 6},
  {id: 4, name: 'Unsalted Butter', categoryID: 2, subcategoryID: 7},
  {id: 5, name: 'Tilapia', categoryID: 0, subcategoryID: 3},
  {id: 7, name: 'Snow Peas', categoryID: 1, subcategoryID: 4},
  {id: 8, name: 'American Cheese', categoryID: 2, subcategoryID: 8},
  {id: 9, name: 'Oat Milk', categoryID: 2, subcategoryID: 7},
  {id: 10, name: 'Ribeye Steak', categoryID: 0, subcategoryID: 1},
];

export const CATEGORIES: Category[] = [
  {id: 0, name: 'Meats, Poultry, and Seafood'},
  {id: 1, name: 'Vegetables'},
  {id: 2, name: 'Dairy'},
]

export const SUBCATEGORIES: SubCategory[] = [
  {id: 1, name: 'Meats', categoryID: 0},
  {id: 2, name: 'Poultry', categoryID: 0},
  {id: 3, name: 'Seafood', categoryID: 0},
  {id: 4, name: 'Beans and Peas', categoryID: 1},
  {id: 5, name: 'Starchy Vegetables', categoryID: 1},
  {id: 6, name: 'Other', categoryID: 1},
  {id: 7, name: 'Milk and Yogurt', categoryID: 2},
  {id: 8, name: 'Cheese', categoryID: 2},
]