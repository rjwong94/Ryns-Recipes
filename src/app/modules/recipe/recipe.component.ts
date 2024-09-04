import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Recipe } from '../../core/services/recipes/recipes.interface';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { RecipesService } from '../../core/services/recipes/recipes.service';
import { IngredientsService } from '../../core/services/ingredients/ingredients.service';
import { Ingredient } from '../../core/services/ingredients/ingredients.interface';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [CommonModule, RecipeDetailsComponent, NgbAccordionModule],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.scss'
})
export class RecipeComponent {
  public recipes: Recipe[] = this._rs.recipes;
  public selectedRecipeId!: number;

  constructor(private _rs: RecipesService, private _is: IngredientsService) {}
  
  onSelect(recipeId: number): void {
    this.selectedRecipeId = recipeId; 
  }

  getIngredient(id: number): Observable<Ingredient | undefined> {
    return this._is.getIngredient(id);
  }
}
