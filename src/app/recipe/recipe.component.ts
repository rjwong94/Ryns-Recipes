import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RECIPES } from '../stored-recipes';
import { Recipe } from '../recipes';
import { RecipeDetailsComponent } from '../recipe-details/recipe-details.component';

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [CommonModule, RecipeDetailsComponent],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.scss'
})
export class RecipeComponent {
  recipes = RECIPES;
  selectedRecipe?: Recipe;
  
  onSelect(recipe: Recipe): void {
    this.selectedRecipe = recipe; 
  }
}
