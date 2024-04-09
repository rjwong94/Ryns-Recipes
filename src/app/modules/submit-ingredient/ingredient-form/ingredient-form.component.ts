import { Component, Input } from '@angular/core';
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
  @Input() id!: number;
  public ingredient: Ingredient = {id: this._is.ingredients.length, name: 'Type Ingredient Name Here', categoryID: this.id}
  
  constructor(private _is: IngredientsService) { };
}
