import { Injectable } from "@angular/core";
import { INGREDIENTS } from "./ingredients.data";
import { Ingredient } from "./ingredients.interface";

@Injectable({ providedIn: 'root' })
export class IngredientsService {
    public ingredients: Ingredient[] = INGREDIENTS;
    
    constructor() {}

    public getIngredient(id: number): Ingredient | undefined {
        return this.ingredients.filter(ingredient => ingredient.id === id).at(0);
    }

    // public getCategory(arr: number[]): number[] | undefined {
    //     let unique: number[] = 
    //         arr.reduce(function (acc: number[], curr: number){
    //             if (!acc.includes(curr))
    //                 acc.push(curr);
    //             return acc;
    //         }, []);
    //         return unique;
    //     // return this.ingredients.filter((ingredient, index) => ingredient.indexOf(ingredient) === index);
    // }
}