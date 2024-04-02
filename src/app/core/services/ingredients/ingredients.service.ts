import { Injectable } from "@angular/core";
import { INGREDIENTS } from "./ingredients.data";
import { Ingredient } from "./ingredients.interface";

@Injectable({ providedIn: 'root' })
export class IngredientsService {
    public ingredients: Ingredient[] = INGREDIENTS;
    public categories!: number[];

    constructor() { }

    public getIngredient(id: number): Ingredient | undefined {
        return this.ingredients.filter(ingredient => ingredient.id === id).at(0);
    }

    public getCategory(): number[] {
        this.categories = this.ingredients.map(ingredients => ingredients.categoryID);
        return [...new Set(this.categories)];
    }
}