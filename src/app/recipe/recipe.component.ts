import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Recipe } from '../recipes';
import { RecipeDetailsComponent } from '../recipe-details/recipe-details.component';
import { GetRecipeService } from '../get-recipe.service';

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [CommonModule, RecipeDetailsComponent],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.scss'
})
export class RecipeComponent {
  recipeList: Recipe[] = [];
  recipeService: GetRecipeService = inject(GetRecipeService);
  constructor() {
    this.recipeList = this.recipeService.getAllRecipes();
  }

  selectedRecipe?: Recipe;

  onSelect(recipe: Recipe): void {
    this.selectedRecipe = recipe;
  }
}
