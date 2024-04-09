import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { Category, SubCategory, Ingredient } from '../../core/services/ingredients/ingredients.interface';
import { CommonModule } from '@angular/common';
import { IngredientsService } from '../../core/services/ingredients/ingredients.service';
import { IngredientFormComponent } from './ingredient-form/ingredient-form.component';

@Component({
  selector: 'app-submit-ingredient',
  standalone: true,
  imports: [CommonModule, IngredientFormComponent],
  templateUrl: './submit-ingredient.component.html',
  styleUrl: './submit-ingredient.component.scss'
})
export class SubmitIngredientComponent implements OnChanges{
  public category: Category[] = this._is.categories;
  public subCategory: SubCategory[] = this._is.subCategories;
  constructor (private _is: IngredientsService) {}; 

  public selectCategoryID!: number;
  public selectSubCategoryID!: number;

  onCatSelect(value: any): void {
    value = parseFloat(value);
    this.selectCategoryID = value;
  }

  onSubCatSelect(value: any): void {
    value = parseFloat(value);
    this.selectSubCategoryID = value;
  }

  getSubCategories(id: number): SubCategory[] {
    return this._is.getSubCategoryByCategory(id);
  }

  ngOnChanges(): void {

  }
}


