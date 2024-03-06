import { Routes } from '@angular/router';
import { IngredientListComponent } from './ingredient-list/ingredient-list.component';
import { RecipeComponent } from './recipe/recipe.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';

export const routes: Routes = [
  {path: 'ingredient-list', component: IngredientListComponent},
  {path: 'recipe-list', component: RecipeComponent},
  {path: 'recipe-details', component: RecipeDetailsComponent}
];
