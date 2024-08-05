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
  ingredients$: Observable<Ingredient[]>;
  recipeIngredients$: Observable<RecipeIngredient[]>;

  constructor(private _is: IngredientsService, private _rs: RecipesService) {
    this.recipeIngredients$ = this._rs.recipeIngredients$.pipe(
      map(recipeIngredients => recipeIngredients.filter(
        value => value.recipeId === this._rs.getNextRecipeId()
      ))
    )

    this.ingredients$ = this.ingredientIds$.pipe(
      map(ingredientIds => ingredientIds.map(id => this._is.getIngredient(id) as Observable<Ingredient>)),
      switchMap(ingredients => combineLatest(ingredients)),
    )
  }

  public addIngredient(newIngredientId: number): Subscription {
    return this.ingredientIds$.pipe(
      take(1)
    ).subscribe(ingredients => {
      if(newIngredientId !== 0 && !newIngredientId || ingredients.includes(newIngredientId)) return;
      ingredients?.push(newIngredientId);
      this._ingredientIds$.next([...ingredients]);
    });
  }

  public getIngredient(id: number): Observable<Ingredient | undefined> {
    return this._is.getIngredient(id);
  }
}
