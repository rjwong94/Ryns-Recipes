import { Injectable } from "@angular/core";
import { CATEGORIES, INGREDIENTS, SUBCATEGORIES } from "./ingredients.data";
import { Category, Ingredient, SubCategory } from "./ingredients.interface";

@Injectable({ providedIn: 'root' })
export class IngredientsService {
    public ingredients: Ingredient[] = INGREDIENTS;
    public categories: Category[] = CATEGORIES;
    public subCategories: SubCategory[] = SUBCATEGORIES;

    constructor() { }

    public getIngredient(id: number): Ingredient | undefined {
        return this.ingredients.filter(ingredient => ingredient.id === id).at(0);
    }

    public getCategory(id: number): Category | undefined {
        return this.categories.filter(category => category.id === id).at(0);
    }

    public getIngredientByCategory(id: number): Ingredient[] {
        return this.ingredients.filter(ingredient => ingredient.categoryID === id);
    }

    public getSubCategory(id: number): SubCategory[] {
        return this.subCategories.filter(sub => sub.categoryID === id);
    }

    public getSubCategoryByCategory(id: number): SubCategory[] {
        return this.subCategories.filter(sub => sub.categoryID === id);
    }

    public addIngredient(existingIngredients: Ingredient, newIngredient: Ingredient): Ingredient {
        return {
            ...existingIngredients,
            ...newIngredient
        };
    }
}