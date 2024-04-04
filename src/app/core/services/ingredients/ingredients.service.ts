import { Injectable } from "@angular/core";
import { CATEGORIES, INGREDIENTS } from "./ingredients.data";
import { Category, Ingredient } from "./ingredients.interface";

@Injectable({ providedIn: 'root' })
export class IngredientsService {
    public ingredients: Ingredient[] = INGREDIENTS;
    public categories: Category[] = CATEGORIES;

    constructor() { }

    public getIngredient(id: number): Ingredient | undefined {
        return this.ingredients.filter(ingredient => ingredient.id === id).at(0);
    }

    public getCategory(id: number): Category | undefined {
        return this.categories.filter(category => category.id === id).at(0);
    }
}