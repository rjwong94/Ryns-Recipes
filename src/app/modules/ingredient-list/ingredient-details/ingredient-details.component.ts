import { Component, Input, OnChanges } from '@angular/core';
import { IngredientsService } from '../../../core/services/ingredients/ingredients.service';
import { Ingredient } from '../../../core/services/ingredients/ingredients.interface';
import { Category } from '../../../core/services/ingredients/ingredients.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ingredient-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ingredient-details.component.html',
  styleUrl: './ingredient-details.component.scss'
})
export class IngredientDetailsComponent{
  @Input() id!: number;
  public category!: Category | undefined;

  constructor(private _is: IngredientsService) {};

  // ngOnChanges(): void {
  //   this.category = this._is.getCategory(this.id);
  // }

  getIngredients(id: number): Ingredient[] {
    return this._is.getIngredientByCategory(id);
  }
}
