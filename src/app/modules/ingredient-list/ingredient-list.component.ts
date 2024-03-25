import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ingredient } from '../../core/services/ingredients/ingredients.interface';
import { IngredientsService } from '../../core/services/ingredients/ingredients.service';

@Component({
  selector: 'app-ingredient-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ingredient-list.component.html',
  styleUrl: './ingredient-list.component.scss'
})

export class IngredientListComponent {
  public ingredient: Ingredient[] = this._is.ingredients;
  public selectedIngredientId!: number;
  public categoryID: number[] = this._is.getCategory()

  constructor(private _is: IngredientsService) { }

  onSelect(ingredientId: number): void {
    this.selectedIngredientId = ingredientId;
  }

}

