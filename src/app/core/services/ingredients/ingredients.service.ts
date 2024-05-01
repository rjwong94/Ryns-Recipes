import { Injectable } from "@angular/core";
import { CATEGORIES, INGREDIENTS, SUBCATEGORIES } from "./ingredients.data";
import { Category, Ingredient, SubCategory } from "./ingredients.interface";
import { BehaviorSubject, Observable, map } from "rxjs";

@Injectable({ providedIn: 'root' })
export class IngredientsService {
    public ingredients: Ingredient[] = INGREDIENTS;
    public _categories$: BehaviorSubject<Category[]> = new BehaviorSubject(CATEGORIES);
    public categories$: Observable<Category[]> = this._categories$.asObservable();
    public _subCategories$: BehaviorSubject<SubCategory[]> = new BehaviorSubject(SUBCATEGORIES);
    public subCategories$: Observable<SubCategory[]> = this._subCategories$.asObservable();
    public subCategories: SubCategory[] = SUBCATEGORIES;
    public categories: Category[] = CATEGORIES;

    constructor() { }

    public getIngredient(id: number): Ingredient | undefined {
        return this.ingredients.filter(ingredient => ingredient.id === id).at(0);
    }

    public getCategory(id: number): Observable<Category | undefined> {
        return this.categories$.pipe(
            map(categories => categories.filter(category => category.id === id).at(0))
        );
    }

    public getIngredientByCategory(id: number): Ingredient[] {
        return this.ingredients.filter(ingredient => ingredient.categoryID === id);
    }

    public getSubCategory(id: number): SubCategory[] {
        return this.subCategories.filter(sub => sub.categoryID === id);
    }

    public getSubCategoryByCategory(id: number): Observable<SubCategory[]> {
        return this.subCategories$.pipe(
            map(subCategory => subCategory.filter(subCategoryId => subCategoryId.id === id))
        );
    }

    public addIngredient(existingIngredients: Ingredient[], newIngredient: Ingredient): Ingredient {
        return {
            ...existingIngredients,
            ...newIngredient
        };
    }
}