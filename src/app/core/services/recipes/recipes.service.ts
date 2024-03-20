import { Injectable } from "@angular/core";
import { Recipe } from "./recipes.interface";
import { RECIPES } from "./recipes.data";

@Injectable({ providedIn: 'root' })
export class RecipesService {
    public recipes: Recipe[] = RECIPES;
    
    constructor() {}

    public getRecipe(id: number): Recipe | undefined {
        return this.recipes.filter(recipe => recipe.id === id).at(0);
    }
}