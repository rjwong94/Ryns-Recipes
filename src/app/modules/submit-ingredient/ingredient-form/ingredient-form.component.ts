import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Ingredient } from '../../../core/services/ingredients/ingredients.interface';
import { IngredientsService } from '../../../core/services/ingredients/ingredients.service';

@Component({
  selector: 'app-ingredient-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './ingredient-form.component.html',
  styleUrl: './ingredient-form.component.scss'
})
export class IngredientFormComponent {
  public ingredient: Ingredient = {id: 5, name: 'Chicken Wing', categoryID: 0}
  
  constructor(private _is: IngredientsService) { };
}
