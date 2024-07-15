import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { Ingredient } from '../../core/services/ingredients/ingredients.interface';
import { AsyncPipe, CommonModule } from '@angular/common';
import { AddIngredientFormComponent } from './add-ingredient-form/add-ingredient-form.component';

@Component({
  selector: 'app-submit-recipe',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe, CommonModule, AddIngredientFormComponent],
  templateUrl: './submit-recipe.component.html',
  styleUrl: './submit-recipe.component.scss'
})
export class SubmitRecipeComponent {
  recipeIngredients: Ingredient[] | undefined = [];
  _recipeIngredients$: BehaviorSubject<Ingredient[] | undefined> = new BehaviorSubject(this.recipeIngredients);
  recipeIngredients$: Observable<Ingredient[] | undefined> = this._recipeIngredients$.asObservable();

  public addIngredient(newIngredient: Ingredient): void {
    if (newIngredient){
      this.recipeIngredients?.push(newIngredient);
      console.log(newIngredient);
      console.log(this.recipeIngredients)
    }

    else (console.log("Undefined Ingredient"))
  }
}
