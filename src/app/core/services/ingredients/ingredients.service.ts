import { Injectable } from "@angular/core";
import { CATEGORIES, INGREDIENTS, SUBCATEGORIES } from "./ingredients.data";
import { Category, Ingredient, SubCategory } from "./ingredients.interface";
import { BehaviorSubject, Observable, map, of } from "rxjs";
import { FormControl } from "@angular/forms";

@Injectable({ providedIn: 'root' })
export class IngredientsService {
    public ingredients: Ingredient[] = INGREDIENTS;
    public _ingredients$: BehaviorSubject<Ingredient[]> = new BehaviorSubject(INGREDIENTS);
    public ingredients$: Observable<Ingredient[]> = this._ingredients$.asObservable();
    public _categories$: BehaviorSubject<Category[]> = new BehaviorSubject(CATEGORIES);
    public categories$: Observable<Category[]> = this._categories$.asObservable();
    public _subCategories$: BehaviorSubject<SubCategory[]> = new BehaviorSubject(SUBCATEGORIES);
    public subCategories$: Observable<SubCategory[]> = this._subCategories$.asObservable();

    constructor() { }

    public getIngredient (id: number): Observable<Ingredient | undefined> {
        return this.ingredients$.pipe(
            map(ingredients => ingredients.filter(value => value.id === id).at(0))
        )
    }

    public getIngredientById(categoryId: number, subcategoryId: number): Observable<Ingredient[]> {
        if (subcategoryId < 0) {
            return this.ingredients$.pipe(
                map(ingredients => ingredients.filter(
                    value => value.categoryID === categoryId
                ))
            )
        }

        else {
            return this.ingredients$.pipe(
                map(ingredients => ingredients.filter(
                    value => value.categoryID === categoryId && value.subcategoryID === subcategoryId
                ))
            );
        }
    }

    public getNextIngredientId(): number {
        const currentIngredients = this._ingredients$.value

        return Math.max(...currentIngredients.map(ingredient => ingredient.id)) + 1;
    }

    public getCategory(id: number): Observable<Category | undefined> {
        return this.categories$.pipe(
            map(categories => categories.filter(category => category.id === id).at(0))
        );
    }

    public getIngredientByCategory(id: number): Ingredient[] {
        return this.ingredients.filter(ingredient => ingredient.categoryID === id);
    }

    public getSubCategoryByCategory(categoryId: number): Observable<SubCategory[]> {
        return this.subCategories$.pipe(
            map(subCategory => subCategory.filter(subCategoryId => subCategoryId.categoryID === categoryId))
        );
    }
}