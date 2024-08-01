import { Component, Input, OnChanges } from '@angular/core';
import { Recipe, RecipeIngredient } from '../../../core/services/recipes/recipes.interface';
import { CommonModule, AsyncPipe } from '@angular/common';
import { RecipesService } from '../../../core/services/recipes/recipes.service';
import { IngredientsService } from '../../../core/services/ingredients/ingredients.service';
import { Ingredient } from '../../../core/services/ingredients/ingredients.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-recipe-details',
  standalone: true,
  imports: [CommonModule, AsyncPipe],
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.scss'
})
export class RecipeDetailsComponent implements OnChanges {
  @Input() id!: number;

  public recipes$!: Observable<Recipe | undefined>;
  public recipeIngredients$!: Observable<RecipeIngredient[] | undefined>;

  constructor(
    private _rs: RecipesService, 
    private _is: IngredientsService
  ) {}

  ngOnChanges(): void {
    this.recipes$ = this._rs.getRecipe(this.id);
    this.recipeIngredients$ = this._rs.getRecipeIngredients(this.id);
  }

  public getIngredient(id: number): Observable<Ingredient | undefined> {
    return this._is.getIngredient(id);
  }

}
