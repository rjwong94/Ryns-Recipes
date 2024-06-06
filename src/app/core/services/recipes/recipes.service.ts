import { Injectable } from "@angular/core";
import { Recipe } from "./recipes.interface";
import { RECIPES } from "./recipes.data";
import { BehaviorSubject, Observable, map } from "rxjs";

@Injectable({ providedIn: 'root' })
export class RecipesService {
    public recipes: Recipe[] = RECIPES;
    private _recipes: BehaviorSubject<Recipe[]> = new BehaviorSubject(RECIPES);
    public recipes$: Observable<Recipe[]> = this._recipes.asObservable();
    
    constructor() {}

    public getRecipe(id: number): Observable<Recipe | undefined> {
        return this.recipes$.pipe(
            map(recipes => recipes.filter(
                value => value.id === id
            ).at(0))
        )
    }
}