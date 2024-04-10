import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Category, SubCategory, Ingredient } from '../../core/services/ingredients/ingredients.interface';
import { CommonModule } from '@angular/common';
import { IngredientsService } from '../../core/services/ingredients/ingredients.service';

@Component({
  selector: 'app-submit-ingredient',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './submit-ingredient.component.html',
  styleUrl: './submit-ingredient.component.scss'
})
export class SubmitIngredientComponent {
  public category: Category[] = this._is.categories;
  public subCategory: SubCategory[] = this._is.subCategories;
  constructor (private _is: IngredientsService) {}; 

  public selectCategoryID: number = 0;
  public selectSubCategoryID!: number | null;
  public ingredient: Ingredient = {id: this._is.ingredients.length, name: '', categoryID: this.selectCategoryID}

  submitted = false;

  onSubmit() { 
    this.submitted = true;
    return this._is.addIngredient(this._is.ingredients,this.ingredient);
   }

  onCatSelect(value: any): void {
    value = parseFloat(value);
    this.selectCategoryID = value;
    this.selectSubCategoryID = null;
  }

  onSubCatSelect(value: any): void {
    value = parseFloat(value);
    this.selectSubCategoryID = value;
  }

  getSubCategories(id: number): SubCategory[] {
    return this._is.getSubCategoryByCategory(id);
  }
}


