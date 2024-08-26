import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject, Observable, Subscription, take, map, switchMap, combineLatest, startWith } from 'rxjs';
import { Ingredient } from '../../core/services/ingredients/ingredients.interface';
import { AsyncPipe, CommonModule } from '@angular/common';
import { AddIngredientFormComponent } from './add-ingredient-form/add-ingredient-form.component';
import { IngredientsService } from '../../core/services/ingredients/ingredients.service';
import { RecipeIngredient } from '../../core/services/recipes/recipes.interface';
import { RecipesService } from '../../core/services/recipes/recipes.service';

@Component({
  selector: 'app-submit-recipe',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe, CommonModule, AddIngredientFormComponent],
  templateUrl: './submit-recipe.component.html',
  styleUrl: './submit-recipe.component.scss'
})
export class SubmitRecipeComponent {
  _ingredientIds$: BehaviorSubject<number[]> = new BehaviorSubject([] as number[]);
  ingredientIds$: Observable<number[]> = this._ingredientIds$.asObservable();
  _recipeIngredients$: BehaviorSubject<RecipeIngredient[]> = new BehaviorSubject([] as RecipeIngredient[]);
  recipeIngredients$: Observable<RecipeIngredient[]> = this._recipeIngredients$.asObservable();

  constructor(private _is: IngredientsService, private _rs: RecipesService) {
    //This is the old live recipeingredients from the add-ingredient-form component. It used to read the array from the service, as showm. Now it will simply read from an internal array of recipeingredients added from the emitted input.
  
    // this.recipeIngredients$ = this._rs.recipeIngredients$.pipe(
    //   map(recipeIngredients => recipeIngredients.filter(
    //     value => value.recipeId === this._rs.getNextRecipeId()
    //   ))
    // )
  }

  public addIngredient(newIngredient: RecipeIngredient): void {
    this.recipeIngredients$.pipe(take(1)).subscribe(recipeIngredients => {
      if (!recipeIngredients.some(ingredient => ingredient.ingredientId === newIngredient.ingredientId)) {
        // Add the newIngredient to the recipeIngredients array
        this._recipeIngredients$.next([...this._recipeIngredients$.value, newIngredient]);
      }
      else (console.log("This ingredient is already in the recipe!"));
    });
  }

  public getIngredient(id: number): Observable<Ingredient | undefined> {
    return this._is.getIngredient(id);
  }
}
