import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Category, Ingredient } from '../../core/services/ingredients/ingredients.interface';
import { IngredientsService } from '../../core/services/ingredients/ingredients.service';

@Component({
  selector: 'app-ingredient-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ingredient-list.component.html',
  styleUrl: './ingredient-list.component.scss'
})

export class IngredientListComponent {
  public category: Category[] = this._is.categories;

  constructor(private _is: IngredientsService) { }

  public selectedIngredientId!: number;
  
  onSelect(ingredientId: number): void {
    this.selectedIngredientId = ingredientId;
  }

}

