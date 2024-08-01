import { Injectable } from "@angular/core";
import { Recipe, RecipeIngredient } from "./recipes.interface";
import { RECIPES, RECIPEINGREDIENTS } from "./recipes.data";
import { BehaviorSubject, Observable, map } from "rxjs";

@Injectable({ providedIn: 'root' })
export class RecipesService {
    public recipes: Recipe[] = RECIPES;
    private _recipes: BehaviorSubject<Recipe[]> = new BehaviorSubject(RECIPES);
    public recipes$: Observable<Recipe[]> = this._recipes.asObservable();
    public recipeIngredients: RecipeIngredient[] = RECIPEINGREDIENTS;
    private _recipeIngredients: BehaviorSubject<RecipeIngredient[]> = new BehaviorSubject(RECIPEINGREDIENTS);
    public recipeIngredients$: Observable<RecipeIngredient[]> = this._recipeIngredients.asObservable();
    
    constructor() {}

    public getRecipe(id: number): Observable<Recipe | undefined> {
        return this.recipes$.pipe(
            map(recipes => recipes.filter(
                value => value.id === id
            ).at(0))
        )
    }

    public getRecipeIngredients(id: number): Observable<RecipeIngredient[]> {
        return this.recipeIngredients$.pipe(
            map(recipeIngredients => recipeIngredients.filter(
                value => value.recipeId === id
            ))
        )
    }
}