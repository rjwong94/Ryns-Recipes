import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject, Observable, Subscription, take, map, switchMap, combineLatest } from 'rxjs';
import { Ingredient } from '../../core/services/ingredients/ingredients.interface';
import { AsyncPipe, CommonModule } from '@angular/common';
import { AddIngredientFormComponent } from './add-ingredient-form/add-ingredient-form.component';
import { IngredientsService } from '../../core/services/ingredients/ingredients.service';

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

  public recipeIngredients$: Observable<Ingredient[]> = this.ingredientIds$.pipe(
    map(ingredientIds => ingredientIds.map(id => this._is.getIngredient(id) as Observable<Ingredient>)),
    switchMap(ingredients => combineLatest(ingredients)),
  );

  constructor(private _is: IngredientsService) {}

  public addIngredient(newIngredientId: number): Subscription {
    return this.ingredientIds$.pipe(
      take(1)
    ).subscribe(ingredients => {
      if(newIngredientId !== 0 && !newIngredientId || ingredients.includes(newIngredientId)) return;
      ingredients?.push(newIngredientId);
      this._ingredientIds$.next([...ingredients]);
    });
  }
}
