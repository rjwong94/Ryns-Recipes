import { Injectable } from "@angular/core";
import { Recipe, RecipeIngredient } from "./recipes.interface";
import { RECIPES } from "./recipes.data";
import { BehaviorSubject, Observable, map } from "rxjs";

@Injectable({ providedIn: 'root' })
export class RecipesService {
    public recipes: Recipe[] = RECIPES;
    private _recipes$: BehaviorSubject<Recipe[]> = new BehaviorSubject(RECIPES);
    public recipes$: Observable<Recipe[]> = this._recipes$.asObservable();

    
    constructor() {}

    public getRecipe(id: number): Observable<Recipe | undefined> {
        return this.recipes$.pipe(
            map(recipes => recipes.filter(
                value => value.id === id
            ).at(0))
        )
    }

    public getRecipeIngredients(id: number): Observable<RecipeIngredient[] | undefined> {
        return this.recipes$.pipe(
            map(recipes => {
                const recipe = recipes.find(recipe => recipe.id === id);
                return recipe ? recipe.ingredients : [];
            })
        );
    }

    public getNextRecipeId(): number {
        return Math.max(...this._recipes$.value.map(recipe => recipe.id)) + 1;
    }

    public addRecipeIngredient(recipeIngredient: RecipeIngredient): void {
        this._recipeIngredients$.next([...this._recipeIngredients$.value, recipeIngredient]);
    }
}